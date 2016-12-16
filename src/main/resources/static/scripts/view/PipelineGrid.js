// create data model
Ext.define('App.view.Pipeline', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'pipelineName', type: 'string'},
       {name: 'boxSteps', type: 'auto'}
    ],
});

Ext.define('App.view.PipelineGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pipelinegrid',
    store: Ext.create('Ext.data.ArrayStore', {
        model: 'App.view.Pipeline',
        data: []
    }),
    id: 'pipelineGrid',
    columns: [
        {
            text     : 'Pipeline',
            width     : 100,
            sortable : false,
            dataIndex: 'pipelineName'
        },
        {
            text     : 'Classes',
            width     : 200,
            sortable : true,
            dataIndex: 'boxSteps'
        }
    ],
    //height: 750,
    width: "100%",
    title: 'Pipeline Table',
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
        updatePipelineGrid();
    }
});