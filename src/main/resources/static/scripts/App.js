Ext.onReady(function() {
	Ext.ariaWarn = Ext.emptyFn;
	Ext.application({
	    name: 'App',
	    appFolder: 'scripts',
	    /*requires: [
	        'App.view.MyViewport'
	    ],*/
	    autoCreateViewport: true,
	    launch: function () {
	        console.log('Application launch function is called!!!');
	    }
	});
    
});
