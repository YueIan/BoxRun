var boxRunningJobId;

function updateJobsGrid(){
	$.ajax({
        url:'/listJobQueue',
        type:'GET', 
        async: true, 
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('jobsGrid');
            grid.getStore().removeAll();
            grid.getStore().add(data.listWaitingJobs);
            grid.getView().refresh();

            var label = Ext.getCmp('currentJobLabel');
            if (data.currentJobInfo) {
               label.setText(data.currentJobInfo.id + " " + data.currentJobInfo.name + " is running");
               if (boxRunningJobId !== data.currentJobInfo.id) {
                    boxRunningJobId = data.currentJobInfo.id;
                    updateResultGrid('normal-result');
                    updateResultGrid('ad-result');
               }
            } else {
                label.setText("no job running.");
            } 
            
            setTimeout(updateJobsGrid,5000);
        },
        error:function(xhr,textStatus){
            console.log('error');
            console.log(xhr);
            console.log(textStatus);
        }
    });
}

function updateNormalDataGrid(){
    $.ajax({
        url:'/listAllNormalStudies',
        type:'GET', 
        async:true, 
        data:{
        },
        timeout:5000,
        dataType:'json',
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('normalGrid');
            grid.getStore().removeAll();
            grid.getStore().add(data);
            grid.getView().refresh();
        },
        error:function(xhr,textStatus){
            console.log('error')
            console.log(xhr)
            console.log(textStatus)
        },
        complete:function(){
            console.log('complete')
        }
    });
}

function updateJarGrid(){
    $.ajax({
        url:'/listAllJars',
        type:'GET', 
        async:true, 
        data:{
        },
        timeout:5000,
        dataType:'json',
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('jarsGrid');
            grid.getStore().removeAll();
            grid.getStore().add(data);
            grid.getView().refresh();
        },
        error:function(xhr,textStatus){
            console.log('error')
            console.log(xhr)
            console.log(textStatus)
        },
        complete:function(){
            console.log('complete')
        }
    });
}

function updatePipelineGrid(){
    $.ajax({
        url:'/listAllPipelines',
        type:'GET', 
        async:true, 
        data:{
        },
        timeout:5000,
        dataType:'json',
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('pipelineGrid');
            grid.getStore().removeAll();
            grid.getStore().add(data);
            grid.getView().refresh();
        },
        error:function(xhr,textStatus){
            console.log('error')
            console.log(xhr)
            console.log(textStatus)
        },
        complete:function(){
            console.log('complete')
        }
    });
}

function updateADNIDataGrid(type){
    $.ajax({
        url:'/listAllADNIStudies',
        type:'GET', 
        async:true, 
        data:{
            type: type
        },
        //timeout:5000,
        dataType:'json',
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('volumeTabPanel');
            var tabGrid = grid.getTabGrid(type);
            tabGrid.getStore().removeAll();
            tabGrid.getStore().add(data);
            tabGrid.getView().refresh();
        },
        error:function(xhr,textStatus){
            console.log('error')
            console.log(xhr)
            console.log(textStatus)
        },
        complete:function(){
            console.log('complete')
        }
    });
}

function updateResultGrid(type){
    $.ajax({
        url:'/listAllADNIResults',
        type:'GET', 
        async:true, 
        data:{
            type: type
        },
        //timeout:5000,
        dataType:'json',
        beforeSend:function(xhr){
        },
        success:function(data,textStatus,jqXHR){
            var grid = Ext.getCmp('volumeTabPanel');
            var tabGrid = grid.getTabGrid(type);
            tabGrid.getStore().removeAll();
            tabGrid.getStore().add(data);
            tabGrid.getView().refresh();
        },
        error:function(xhr,textStatus){
            console.log('error')
            console.log(xhr)
            console.log(textStatus)
        },
        complete:function(){
            console.log('complete')
        }
    });
}