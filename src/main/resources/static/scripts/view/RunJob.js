Ext.define('App.view.RunJob', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.runjob',
    id: 'runJob',
    layout: 'vbox',
    initComponent: function () {
    	var me = this;
        this.callParent();

        var uploadWindow = Ext.create('App.view.uploadWindow');
        uploadWindow.hide();

    	var btn1 = Ext.create('Ext.Button', {
		    text: 'Run',
		    //renderTo: Ext.getBody(),
		    handler: function() {
                var tabPanel = Ext.getCmp('volumeTabPanel');
                var dataGrid = tabPanel.getActiveTab();
                var boxGrid = Ext.getCmp('jarsGrid');
                if (dataGrid.getSelectionModel().hasSelection() && boxGrid.getSelectionModel().hasSelection()) {
                   var dataRowsId = getSelectionId(dataGrid.getSelectionModel().getSelection());
                   var boxRow = boxGrid.getSelectionModel().getSelection()[0];
                   $.ajax({
                        url:'/runBox',
                        type:'POST', 
                        async:true, 
                        data:JSON.stringify({
                            myids: dataRowsId,
                            boxName: boxRow.get('boxName').toString()
                        }),
                        contentType: 'application/json;charset=utf-8',
                        dataType:'json',
                        success:function(data,textStatus,jqXHR){
                            console.log('success');
                            console.log(data);
                            updateNormalDataGrid();
                        },
                        error:function(xhr,textStatus){
                            console.log('error');
                            console.log(xhr);
                            console.log(textStatus);
                        },
                        complete:function(){
                            console.log('complete');
                        }
                    });
                }
		    }
		});
		me.add(btn1);

        var btn2 = Ext.create('Ext.Button', {
            text: 'Upload Jar',
            handler: function() {
                uploadWindow.show();
            }
        });
        me.add(btn2);

        var btn3 = Ext.create('Ext.Button', {
            text: 'Run Pipeline',
            //renderTo: Ext.getBody(),
            handler: function() {
                var tabPanel = Ext.getCmp('volumeTabPanel');
                var dataGrid = tabPanel.getActiveTab();
                var boxGrid = Ext.getCmp('pipelineGrid');
                if (dataGrid.getSelectionModel().hasSelection() && boxGrid.getSelectionModel().hasSelection()) {
                   var dataRowsId = getSelectionId(dataGrid.getSelectionModel().getSelection());
                   var boxRow = boxGrid.getSelectionModel().getSelection()[0];
                   $.ajax({
                        url:'/runPipeline',
                        type:'POST', 
                        async:true, 
                        data:JSON.stringify({
                            myids: dataRowsId,
                            pipelineName: boxRow.get('pipelineName').toString()
                        }),
                        contentType: 'application/json;charset=utf-8',
                        dataType:'json',
                        success:function(data,textStatus,jqXHR){
                            console.log('success');
                            console.log(data);
                        },
                        error:function(xhr,textStatus){
                            console.log('error');
                            console.log(xhr);
                            console.log(textStatus);
                        },
                        complete:function(){
                            console.log('complete');
                        }
                    });
                }
            }
        });
        me.add(btn3);

        var jarGrid = Ext.create('App.view.JarsGrid');
        me.add(jarGrid);

        var pipelineGrid = Ext.create('App.view.PipelineGrid');
        me.add(pipelineGrid);
    }
});

function getSelectionId(selections){
    var i, ids = [];
    for (i in selections) {
        ids.push(selections[i].get('myid').toString());
    }
    return ids;
}