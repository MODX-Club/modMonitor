<?php

require_once __DIR__ . '/../index.class.php';

class ModmonitorControllersMgrRequestsIndexManagerController extends ModmonitorControllersMgrIndexManagerController{
    
    public function loadCustomCssJs() {
        
        
        parent::loadCustomCssJs();
        
        $this->addHtml("
        <script>
        Ext.onReady(function() {
            MODx.add({
                xtype: 'modmonitor-panel-panel'
                ,header_title: 'Статистика запросов'
                ,items:[{
                    xtype: 'modmonitor-grid-requests'
                }]
            });
        });
        </script>
        "
        );
    }
}




