Ext.define('App.view.VolumeTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.volumetabpanel',
    id: 'volumeTabPanel',
    initComponent: function () {
        var me = this;
        me.callParent();

        var normal = Ext.create('widget.normalgrid', {title: 'Normal Data', itemId: 'brainNormal'});
        me.add(normal);

        var normal = Ext.create('widget.adnigrid', {title: 'ADNI Normal Data', itemId: 'normal'});
        me.add(normal);

        var ad = Ext.create('widget.adnigrid', {title: 'ADNI AD Data', itemId: 'ad'});
        me.add(ad);
    },
    getTabGrid: function(type){
    	var me = this;
    	return me.getComponent(type);
    }
});