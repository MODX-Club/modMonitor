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
                ,header_title: 'Вызываемые элементы'
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




