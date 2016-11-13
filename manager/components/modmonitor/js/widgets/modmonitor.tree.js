modMonitor.tree.Tree = function(config) {
    
    config = config || {};
    
    Ext.applyIf(config,{
        url: modMonitor.config.connector_url
        ,action: 'requests/tree/getData'
        ,baseParams: {
            request_id: config.request_id
            ,format: 'tree'
        }
        ,rootVisible: false
        ,autoExpandRoot: true
        // ,hideParent: true
    });
    
    modMonitor.tree.Tree.superclass.constructor.call(this,config);
    
};
Ext.extend(modMonitor.tree.Tree, MODx.tree.Tree,{
    
    // getToolbar: function(){
    //     
    // }
    
});
Ext.reg('modmonitor-tree-tree',modMonitor.tree.Tree);


modMonitor.tree.RequestsTree = function(config) {
    modMonitor.tree.RequestsTree.superclass.constructor.call(this,config);
};
Ext.extend(modMonitor.tree.RequestsTree, modMonitor.tree.Tree,{

});
Ext.reg('modmonitor-tree-requesttree',modMonitor.tree.RequestsTree);


