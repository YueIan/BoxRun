package com.tmc.utils;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by TMC on 12/7/2016.
 */
public class NamedThreadFactory implements ThreadFactory {
    private AtomicInteger threadNumber = new AtomicInteger(0);
    private final String name;
    private ClassLoader currentClassLoader = null;

    public NamedThreadFactory(String factoryName) {
        this.name = factoryName;
        this.currentClassLoader = Thread.currentThread().getContextClassLoader();
    }

    public Thread newThread(Runnable r) {
        Thread newThread = new Thread(r, this.name + "_" + this.threadNumber.getAndIncrement());
        newThread.setContextClassLoader(this.currentClassLoader);
        return newThread;
    }
}