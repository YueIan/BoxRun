package com.tmc.services.rest;

import com.tmc.mongodb.MongoDBDriver;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @RequestMapping(value = "/listAllADNIResults")
    public Object listAllADNIResults(@RequestParam(value = "type") String adniType) {

        String[] input = adniType.split("-");

        HashMap<String, Object> qJar = new HashMap<>();
        qJar.put("volumeType", "adni");
        List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", qJar);
        List<List<HashMap<String, Object>>> collectionList = new ArrayList<>();
        for (HashMap<String, Object> j : jarList) {
            collectionList.add(MongoDBDriver.get((String) j.get("outputCollection"), null));
        }

        HashMap<String, Object> qRaw = new HashMap<>();
        qRaw.put("volumeType", input[0]);
        List<HashMap<String, Object>> dataList = MongoDBDriver.batchGet("myraw", qRaw);

        List<HashMap<String, Object>> resultMap = new ArrayList<>();

        for (HashMap<String, Object> m : dataList){
            HashMap<String, Object> rm = new HashMap<>();
            rm.put("myid", m.get("myid"));
            HashMap<String, Object> rmq = new HashMap<>();
            rmq.put("myid", m.get("myid"));
            for (int i=0;i<collectionList.size();i++){
                for (HashMap<String, Object> lji : collectionList.get(i)){
                    if (lji.get("myid").equals(m.get("myid"))){
                        rm.put((String) jarList.get(i).get("boxName"), lji.get("update_time"));
                        break;
                    }
                }

            }
            resultMap.add(rm);
        }

        return resultMap;
    }
}
