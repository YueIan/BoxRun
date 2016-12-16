package com.tmc.services.rest;

import com.tmc.mongodb.MongoDBDriver;
import com.tmc.services.extensible.Loader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@Controller
public class FileUploadController {
    // The Environment object will be used to read parameters from the
    // application.properties configuration file
    @Autowired
    private Environment env;

    @RequestMapping(
            value = "/uploadFile",
            method = RequestMethod.POST)
    public @ResponseBody Object create(FileUploadBean uploadItem, BindingResult result){

        ExtJSFormResult extjsFormResult = new ExtJSFormResult();

        if (result.hasErrors()){
            for(ObjectError error : result.getAllErrors()){
                System.err.println("Error: " + error.getCode() +  " - " + error.getDefaultMessage());
            }
            extjsFormResult.setSuccess(false);
            return extjsFormResult;
        }

        try {
            // Get the filename and build the local file path
            String filename = uploadItem.getFile().getOriginalFilename();
            String directory = env.getProperty("paths.uploadedFiles");
            String filepath = Paths.get(directory, filename).toString();

            // Save the file locally
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(uploadItem.getFile().getBytes());
            stream.close();

            HashMap<String, Object> q = new HashMap<>();
            q.put("boxName", uploadItem.getBoxName());
            List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", q);
            HashMap<String, Object> m;
            if (jarList == null ||jarList.size() == 0){
                m = new HashMap<>();
                m.put("boxName", uploadItem.getBoxName());
            } else {
                m = jarList.get(0);
            }
            m.put("className", uploadItem.getKlassName());
            m.put("jarPath", filepath);
            MongoDBDriver.batchInsert(m, "my-jar-store");

            Loader.loadLibrary(new File(filepath));

            extjsFormResult.setSuccess(true);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            extjsFormResult.setSuccess(false);
        }

        return extjsFormResult;

    }
}
