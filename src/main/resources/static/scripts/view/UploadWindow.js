Ext.define('App.view.uploadWindow', {
    extend: 'Ext.form.Panel',
    alias: 'widget.uploadWindow',
    title: 'File Uploader',
    width: 400,
    bodyPadding: 10,
    frame: true,
    //renderTo: Ext.getBody(),
    floating: true,
    draggable: true,
    closable: true,
    closeAction: 'hide',
    items: [{
        xtype: 'textfield',
        name: 'boxName',
        fieldLabel: 'BoxName',
        labelWidth: 80,
        allowBlank: false,
        anchor: '100%'
    },{
        xtype: 'textfield',
        name: 'klassName',
        fieldLabel: 'ClassName',
        labelWidth: 80,
        allowBlank: false,
        anchor: '100%'
    },{
        xtype: 'textfield',
        name: 'volumeType',
        fieldLabel: 'volume Type',
        labelWidth: 80,
        allowBlank: false,
        anchor: '100%'
    },{
        xtype: 'textfield',
        name: 'outputCollection',
        fieldLabel: 'Output Collection',
        labelWidth: 80,
        allowBlank: false,
        anchor: '100%'
    },{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'File',
        labelWidth: 80,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Select a File...'
    }],

    buttons: [{
        text: 'Upload',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'uploadFile',
                    waitMsg: 'Uploading your file...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', 'Your file has been uploaded.');
                        this.up().hide();
                    }
                });
            }
        }
    }]
});  