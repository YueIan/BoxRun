package com.tmc.utils;

import com.tmc.job.JobInfo;
import com.tmc.job.JobRunnable;
import lombok.Data;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Data
public class JobQueue implements Runnable {

    private Queue<JobRunnable> jobQueue = new LinkedList<>();

    private JobInfo currentRunJobInfo = new JobInfo();

    public void run(){
        while (true){
            JobRunnable r = jobQueue.poll();
            if (r != null){
                currentRunJobInfo = r.getJobInfo();
                r.run();
            }
            currentRunJobInfo.setName("No Job");
            currentRunJobInfo.setType("");
        }
    }

    public synchronized void add(JobRunnable e){
        jobQueue.add(e);
    }

    public JobInfo getCurrentJob(){
        return currentRunJobInfo;
    }

    public List<JobInfo> listWaitingJobs(){
        List<JobInfo> jobNames = new ArrayList<>();
        for (JobRunnable jr : jobQueue){
            jobNames.add(jr.getJobInfo());
        }
        return jobNames;
    }
}
