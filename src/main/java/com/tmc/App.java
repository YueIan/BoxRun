package com.tmc;

import com.tmc.services.extensible.Loader;
import com.tmc.utils.JobQueueUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

//@ConfigurationProperties(locations = {"application.yml"})
@PropertySource("classpath:Application.yml")
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
        Loader.loadExtendJars();
        JobQueueUtils.start();
    }
}
