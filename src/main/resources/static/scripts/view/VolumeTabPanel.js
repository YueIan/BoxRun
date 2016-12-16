Ext.define('App.view.VolumeTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.volumetabpanel',
    id: 'volumeTabPanel',
    initComponent: function () {
        var me = this;
        me.callParent();

        var normal = Ext.create('widget.normalgrid', {title: 'Normal Data', itemId: 'brainNormal'});
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
    },
    getTabGrid: function(type){
    	var me = this;
    	return me.getComponent(type);
    }
});