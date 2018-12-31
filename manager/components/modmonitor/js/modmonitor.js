var modMonitor = function(config){
    config = config || {};
    modMonitor.superclass.constructor.call(this,config);
};
Ext.extend(modMonitor,Ext.Component,{
    page:{},
    window:{},
    grid:{},
    tree:{},
    panel:{},
    combo:{},
    config:{}
});

Ext.reg('modmonitor',modMonitor);

var modMonitor = new modMonitor();