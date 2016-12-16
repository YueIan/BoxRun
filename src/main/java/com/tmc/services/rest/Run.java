package com.tmc.services.rest;

import com.mongodb.BasicDBList;
import com.tmc.job.JobRunnable;
import com.tmc.mongodb.MongoDBDriver;
import com.tmc.utils.JobQueueUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class Run {

    @RequestMapping(method = RequestMethod.POST, value = "/runBox", headers = "Content-type=application/json;charset=utf-8")
    public Object runBGM(@RequestBody RunItem runItem) {
        HashMap<String, Object> q = new HashMap<>();
        q.put("boxName", runItem.getBoxName());
        List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", q);
        if (jarList == null ||jarList.size() == 0){
            return null;
        }

        try {
            String[] ids = runItem.getMyids();
            if (ids == null){
                return null;
            }
            for (String id : ids){
                System.out.println("running " + id);
                Class<?> theClass = Class.forName((String)(jarList.get(0).get("className")));
                JobRunnable jobRunnable = (JobRunnable)theClass.newInstance();
                jobRunnable.setId(id);
                JobQueueUtils.submit(jobRunnable);
            }

        } catch (ClassNotFoundException|InstantiationException|IllegalAccessException e){
            e.printStackTrace();
        }
        return runItem;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/runPipeline", headers = "Content-type=application/json;charset=utf-8")
    public Object runPipeline(@RequestBody RunPipeline runPipeline) {
        HashMap<String, Object> q = new HashMap<>();
        q.put("pipelineName", runPipeline.getPipelineName());
        List<HashMap<String, Object>> pipelineList = MongoDBDriver.batchGet("my-pipeline", q);
        if (pipelineList == null || pipelineList.size() == 0){
            return null;
        }

        BasicDBList dbList = (BasicDBList)pipelineList.get(0).get("boxSteps");
        List<Class<?>> theClassList = new ArrayList<>();
        try {
            for (int i=0;i<dbList.size();i++){
                HashMap<String, Object> qJarStore = new HashMap<>();
                qJarStore.put("boxName", dbList.get(i));
                List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", qJarStore);
                if (jarList != null || jarList.size() == 1) {
                    theClassList.add(Class.forName((String)(jarList.get(0).get("className"))));
                }
            }
        } catch (ClassNotFoundException e){
            e.printStackTrace();
        }

        try {
            String[] ids = runPipeline.getMyids();
            if (ids == null){
                return null;
            }
            for (String id : ids){
                System.out.println("running " + id);

                for (Class theClass : theClassList){
                    JobRunnable jobRunnable = (JobRunnable)theClass.newInstance();
                    jobRunnable.setId(id);
                    JobQueueUtils.submit(jobRunnable);
                }
            }

        } catch (InstantiationException|IllegalAccessException e){
            e.printStackTrace();
        }

        return runPipeline;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listJobQueue")
    public Object listJobQueue() {
        /*try{
            Thread.sleep(1000);
            } catch (InterruptedException e){
                e.printStackTrace();
        }*/

        JobStatus jobStatus = new JobStatus();
        jobStatus.setCurrentJobInfo(JobQueueUtils.getCurrentJob());
        jobStatus.setListWaitingJobs(JobQueueUtils.listWaitingJobs());

        return jobStatus;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listAllJars")
    public Object listAllJars() {
        List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", null);
        return jarList;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/listAllPipelines")
    public Object listAllPipelines() {
        List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-pipeline", null);
        return jarList;
    }
}
