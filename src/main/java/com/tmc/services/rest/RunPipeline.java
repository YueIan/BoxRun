package com.tmc.services.rest;

import lombok.Data;

@Data
public class RunPipeline {
    private String[] myids;

    private String pipelineName;
}
