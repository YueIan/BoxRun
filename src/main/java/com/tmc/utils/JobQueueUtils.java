package com.tmc.utils;

import com.tmc.job.JobInfo;
import com.tmc.job.JobRunnable;

import java.util.LinkedList;
import java.util.List;

public class JobQueueUtils {

    private static JobQueue jobQueue = new JobQueue();

    public static void submit(JobRunnable e){
        jobQueue.add(e);
    }

    public static void start(){
        //(new Thread(jobQueue)).start();
        LinkedList taskToLaunch = new LinkedList();
        taskToLaunch.add(jobQueue);
        ThreadUtils.submit(taskToLaunch);
    }

    public static JobInfo getCurrentJob(){
        return jobQueue.getCurrentJob();
    }

    public static List<JobInfo> listWaitingJobs(){
        return jobQueue.listWaitingJobs();
    }
}
