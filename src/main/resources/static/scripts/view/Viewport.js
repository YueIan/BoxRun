Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',
    layout: 'border',
    //renderTo: Ext.getBody(),
    /*requires: [
        'App.view.RunBGM',
        'App.view.MyGrid'
    ],*/
    items: [{
        region: 'north',
        html: '<h1 class="x-panel-header">Page Title</h1>',
        border: false,
        margins: '0 0 5 0'
    }, {
        region: 'west',
        collapsible: true,
        title: 'Volume',
        xtype: 'volumetabpanel',
        itemId: 'west'
    }, {
        region: 'south',
        title: 'South Panel',
        collapsible: true,
        html: 'Information goes here',
        split: true,
        height: 100,
        minHeight: 100
    }, {
        region: 'east',
        title: 'East Panel',
        xtype: 'jobpanel',
        collapsible: true,
        split: true,
        width: 450
    }, {
        region: 'center',
        xtype: 'runjob', // TabPanel itself has no title
        title: 'Box',
        itemId: 'center'
    }],
    initComponent: function () {
        var me = this;
        this.callParent();
        //me.getComponent('center').getComponent('bgm').add(Ext.create('App.view.RunBGM'));
    }
});

    

    