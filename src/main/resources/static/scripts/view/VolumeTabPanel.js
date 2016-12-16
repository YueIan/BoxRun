Ext.define('App.view.VolumeTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.volumetabpanel',
    id: 'volumeTabPanel',
    initComponent: function () {
        var me = this;
        me.callParent();

        var normal = Ext.create('widget.normalgrid', {title: 'Normaltive Data', itemId: 'brainNormal'});
        me.add(normal);

        var normalStore = Ext.create('Ext.data.Store', {
            model: Ext.create('Ext.data.Model', {fields: adniFields}),
            autoLoad: true
        });
        var normal = Ext.create('widget.adnigrid', {title: 'ADNI Normal Data', itemId: 'normal', store: normalStore});
        me.add(normal);

        var adStore = Ext.create('Ext.data.Store', {
            model: Ext.create('Ext.data.Model', {fields: adniFields}),
            autoLoad: true
        });
        var ad = Ext.create('widget.adnigrid', {title: 'ADNI AD Data', itemId: 'ad', store: adStore});
        me.add(ad);

        var normalResultStore = Ext.create('Ext.data.Store', {
            model: Ext.create('Ext.data.Model', {fields: [
                {name: 'myid', type: 'string'}, 
                {name: 'ADNI BGM', type: 'string'}, 
                {name: 'ADNI Data Volume Count', type: 'string'}
            ]}),
            autoLoad: true
        });
        var normalResult = Ext.create('widget.resultgrid', {title: 'ADNI Normal Results', itemId: 'normal-result', store: normalResultStore});
        me.add(normalResult);

        var adResultStore = Ext.create('Ext.data.Store', {
            model: Ext.create('Ext.data.Model', {fields: [
                {name: 'myid', type: 'string'}, 
                {name: 'ADNI BGM', type: 'string'}, 
                {name: 'ADNI Data Volume Count', type: 'string'}
            ]}),
            autoLoad: true
        });
        var adResult = Ext.create('widget.resultgrid', {title: 'ADNI AD Results', itemId: 'ad-result', store: adResultStore});
        me.add(adResult);
    },
    getTabGrid: function(type){
    	var me = this;
    	return me.getComponent(type);
    }
});