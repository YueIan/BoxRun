Ext.define('App.view.JobPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobpanel',
    id: 'jobpanel',
    layout: 'vbox',
    items:[{
        xtype: 'label',
        id: 'currentJobLabel',
        text: 'My Awesome Field'
    },{
        xtype: 'jobsgrid'
    }]
});