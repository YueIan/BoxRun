Ext.define('App.view.ResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resultgrid',
    multiSelect: true,
    columns: [
        {
            text     : 'Study Name',
            width    : 175,
            sortable : false,
            dataIndex: 'myid'
        },
        {
            text     : 'BGM',
            width    : 175,
            sortable : false,
            dataIndex: 'ADNI BGM'
        },
        {
            text     : 'Volume Count',
            width    : 175,
            sortable : false,
            dataIndex: 'ADNI Data Volume Count'
        }
    ],
    //height: 350,
    width: 850,
    title: 'Results Table',
    viewConfig: {
        stripeRows: true
    },
    afterRender: function () {
        var me = this;
        this.callParent();
        updateResultGrid(me.itemId);
    }
});