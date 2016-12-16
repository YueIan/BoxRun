// create data model
Ext.define('App.view.Jobs', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'name', type: 'string'}
    ],
});

Ext.define('App.view.JobsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.jobsgrid',
    store: Ext.create('Ext.data.ArrayStore', {
        model: 'App.view.Jobs',
        data: []
    }),
    id: 'jobsGrid',
    columns: [
        {
            text     : 'Volume Id',
            width     : 100,
            sortable : false,
            dataIndex: 'id',
            flex: 2
        },{
            text     : 'Job Type',
            width     : 100,
            sortable : false,
            dataIndex: 'type',
            flex: 1
        },{
            text     : 'Study Name',
            width     : 200,
            sortable : true,
            dataIndex: 'name',
            flex: 1
        }
    ],
    //height: 350,
    width: 250,
    title: 'Jobs Information Table',
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
        updateJobsGrid();
    }
});