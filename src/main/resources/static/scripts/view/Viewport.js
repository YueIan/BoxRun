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
        html: '<img src="box-running.jpg" alt="Box Running" height="42" width="42">',
        border: false,
        margins: '0 0 5 0'
    }, {
        region: 'west',
        collapsible: true,
        split: true,
        title: 'Volume',
        xtype: 'volumetabpanel',
        itemId: 'west',
        width: 900
    }, {
        region: 'south',
        title: 'Current Job Running',
        collapsible: true,
        split: true,
        height: 100,
        minHeight: 100,
        items:[{
            xtype: 'label',
            id: 'currentJobLabel',
            text: 'My Awesome Field'
        }]
    }, {
        region: 'east',
        title: 'Job',
        xtype: 'jobsgrid',
        collapsible: true,
        split: true,
        width: 650
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

    

    