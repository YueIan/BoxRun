// create data model
Ext.define('App.view.ADNIModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'myid', type: 'string'},
       {name: 'width', type: 'int'},
       {name: 'height', type: 'int'},
       {name: 'slice', type: 'int'},
       {name: 'update_time', type: 'string'}
    ],
});

Ext.define('App.view.ADNIGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.adnigrid',
    store: Ext.create('Ext.data.ArrayStore', {
        model: 'App.view.ADNIModel',
        data: []
    }),
    multiSelect: true,
    columns: [
        {
            text     : 'Study Name',
            width    : 175,
            sortable : false,
            dataIndex: 'myid'
        },
        {
            text     : 'Width',
            width    : 75,
            sortable : true,
            dataIndex: 'width'
        },
        {
            text     : 'Height',
            width    : 85,
            sortable : true,
            dataIndex: 'height'
        },
        {
            text     : 'Slice',
            width    : 85,
            sortable : true,
            dataIndex: 'slices'
        },
        {
            text     : 'Updated Time',
            width    : 185,
            sortable : true,
            dataIndex: 'update_time'
        }
    ],
    //height: 350,
    width: 850,
    title: 'ADNI Information Table',
    viewConfig: {
        stripeRows: true
    },
    afterRender: function () {
        var me = this;
        this.callParent();
        updateADNIDataGrid(me.itemId);
    }
});