package com.tmc.services.rest;

import com.tmc.job.JobInfo;
import lombok.Data;

import java.util.List;

@Data
public class JobStatus {

    private JobInfo currentJobInfo;

    private List<JobInfo> listWaitingJobs;
}
