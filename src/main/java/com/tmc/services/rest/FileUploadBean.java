package com.tmc.services.rest;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileUploadBean {

    private String boxName;

    private String klassName;

    private MultipartFile file;
}
