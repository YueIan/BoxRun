package com.tmc.services.extensible;


import com.tmc.mongodb.MongoDBDriver;

import java.io.File;
import java.util.HashMap;
import java.util.List;

public class Loader {
    /*
     * Adds the supplied Java Archive library to java.class.path. This is benign
     * if the library is already loaded.
     */
    public static synchronized void loadLibrary(java.io.File jar)
    {
        try {
            /*We are using reflection here to circumvent encapsulation; addURL is not public*/
            java.net.URLClassLoader loader = (java.net.URLClassLoader)ClassLoader.getSystemClassLoader();
            java.net.URL url = jar.toURI().toURL();
            /*Disallow if already loaded*/
            for (java.net.URL it : java.util.Arrays.asList(loader.getURLs())){
                if (it.equals(url)){
                    return;
                }
            }
            java.lang.reflect.Method method = java.net.URLClassLoader.class.getDeclaredMethod("addURL", new Class[]{java.net.URL.class});
            method.setAccessible(true); /*promote the method to public access*/
            method.invoke(loader, new Object[]{url});
        } catch (final java.lang.NoSuchMethodException |
                java.lang.IllegalAccessException |
                java.net.MalformedURLException |
                java.lang.reflect.InvocationTargetException e){
        }
    }

    public static void loadExtendJars(){
        List<HashMap<String, Object>> jarList = MongoDBDriver.batchGet("my-jar-store", null);

        for (HashMap<String, Object> m : jarList){
            String jarLocation = (String)m.get("jarPath");
            loadLibrary(new File(jarLocation));
        }
    }
}
