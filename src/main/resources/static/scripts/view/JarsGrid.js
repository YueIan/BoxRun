// create data model
Ext.define('App.view.Jars', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'boxName', type: 'string'},
       {name: 'className', type: 'string'}
    ],
});

Ext.define('App.view.JarsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jarsgrid',
    store: Ext.create('Ext.data.ArrayStore', {
        model: 'App.view.Jars',
        data: []
    }),
    id: 'jarsGrid',
    columns: [
        {
            text     : 'Box',
            width     : 100,
            sortable : false,
            dataIndex: 'boxName',
            flex: 1
        },
        {
            text     : 'Class',
            width     : 200,
            sortable : true,
            dataIndex: 'className',
            flex: 2
        }
    ],
    //height: 750,
    width: "100%",
    title: 'Box Table',
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        var me = this;
        this.callParent();
    },
    afterRender: function () {
        var me = this;
        this.callParent();
        updateJarGrid();
    }
});