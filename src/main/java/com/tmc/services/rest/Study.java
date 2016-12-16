package com.tmc.services.rest;

import com.tmc.mongodb.MongoDBDriver;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class Study {

    @RequestMapping(value = "/listAllNormalStudies")
    public Object listAllStudies() {

        List<HashMap<String, Object>> normalDataList = MongoDBDriver.batchGet("my-mri-cloud", null);

        return normalDataList;
    }

    @RequestMapping(value = "/listAllADNIStudies")
    public Object listAllADNIStudies(@RequestParam(value = "type") String adniType) {

        HashMap<String, Object> q = new HashMap<>();
        q.put("volumeType", adniType);

        List<HashMap<String, Object>> dataList = MongoDBDriver.batchGet("myraw", q);

        return dataList;
    }
}
