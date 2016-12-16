package com.tmc.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.*;

/**
 * Created by TMC on 12/7/2016.
 */
public class ThreadUtils {
    protected static ThreadFactory namedThreadFactory = new NamedThreadFactory("BOX_RUN_THREAD");
    private static ExecutorService threadPool = null;

    public ThreadUtils() {
    }

    public static boolean submit(List<Runnable> runnables) {
        boolean result = true;
        ArrayList futures = new ArrayList(runnables.size());
        Iterator var3 = runnables.iterator();

        while(var3.hasNext()) {
            Runnable futur = (Runnable)var3.next();
            Future e = threadPool.submit(futur);
            futures.add(e);
        }

        for(var3 = futures.iterator(); var3.hasNext(); result = result) {
            Future futur1 = (Future)var3.next();

            try {
                futur1.get();
            } catch (ExecutionException | InterruptedException var6) {
                result = false;
            }
        }

        return result;
    }

    static {
        int poolSize = Integer.getInteger("poolthreadsize", Runtime.getRuntime().availableProcessors()).intValue();
        threadPool = Executors.newFixedThreadPool(poolSize, namedThreadFactory);
    }
}
