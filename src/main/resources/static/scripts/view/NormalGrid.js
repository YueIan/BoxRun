// create data model
Ext.define('App.view.Studies', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'name', type: 'string'},
       {name: 'age',      type: 'int'},
       {name: 'gender',    type: 'string'},
       {name: 'width',  type: 'int'},
       {name: 'height', type: 'int'},
       {name: 'slice', type: 'int'},
       {name: 'update_time', type: 'string'}
    ],
});

Ext.define('App.view.NormalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.normalgrid',
    store: Ext.create('Ext.data.ArrayStore', {
        model: 'App.view.Studies',
        data: []
    }),
    id: 'normalGrid',
    multiSelect: true,
    columns: [
        {
            text     : 'Study Name',
            width    : 175,
            sortable : false,
            dataIndex: 'myid'
        },
        {
            text     : 'Age',
            width    : 75,
            sortable : true,
            dataIndex: 'age'
        },
        {
            text     : 'Gender',
            width    : 75,
            sortable : true,
            dataIndex: 'gender'
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
            text     : 'BGM Updated Time',
            width    : 185,
            sortable : true,
            dataIndex: 'update_time'
        }
    ],
    //height: 350,
    width: 850,
    title: 'Normal Information Table',
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
        updateNormalDataGrid();
    }
});