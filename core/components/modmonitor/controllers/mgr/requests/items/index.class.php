<?php

require_once __DIR__ . '/../../index.class.php';

class ModmonitorControllersMgrRequestsItemsIndexManagerController extends ModmonitorControllersMgrIndexManagerController{
    
    public function loadCustomCssJs() {
        
        
        parent::loadCustomCssJs();
        
        $this->addHtml("
        <script>
        Ext.onReady(function() {
            MODx.add({
                xtype: 'modmonitor-panel-panel'
                ,header_title: _('modmonitor.search_statistics')
                ,items:[{
                    xtype: 'modmonitor-grid-requestitems-extended'
                }]
            });
        });
        </script>
        "
        );
    }
}




