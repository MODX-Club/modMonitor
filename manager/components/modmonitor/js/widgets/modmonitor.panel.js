/**
 * @class MODx.panel.User
 * @extends MODx.FormPanel
 * @param {Object} config An object of configuration properties
 * @xtype modx-panel-user
 */
modMonitor.panel.Panel = function(config) {
    config = config || {};
    
    var items = [{
        html: '<h2>'+ ( config.header_title ? config.header_title : _('modmonitor') )+'</h2>'
        ,border: false
        ,cls: 'modx-page-header'
        ,id: 'modx-user-header'
    }];
    
    Ext.applyIf(config,{
        url: modMonitor.config.connector_url
        ,baseParams: {}
    	,cls: 'container'
        ,defaults: { collapsible: false ,autoHeight: true }
        ,bodyStyle: ''
        // ,useLoadingMask: true
        ,listeners: {
            'setup': {fn:this.setup,scope:this}
            ,'success': {fn:this.success,scope:this}
            ,'beforeSubmit': {fn:this.beforeSubmit,scope:this}
        }
    });
    
    if(config.items){
        for(var i in config.items){
            if(typeof config.items[i] == 'function'){
                continue;
            }
            items.push(config.items[i]);
        }
    }
    
    config.items = items;
    
    modMonitor.panel.Panel.superclass.constructor.call(this,config);
};

Ext.extend(modMonitor.panel.Panel,MODx.Panel,{
    setup: function() {}
    
    ,beforeSubmit: function(o) {}

    ,success: function(o) {}
});

Ext.reg('modmonitor-panel-panel',modMonitor.panel.Panel);
