<?php

require_once __DIR__ . '/../index.class.php';

class ModmonitorControllersMgrRequestsIndexManagerController extends ModmonitorControllersMgrIndexManagerController{
    
    public $requests_grid_columns = array();
    
    public function loadCustomCssJs() {
        
        # $this->requests_grid_columns = columns: [
        #         {
        #             header: 'ID'
        #             ,dataIndex: 'id'
        #             ,editable: false
        #         };
        
        $this->requests_grid_columns = array(
            array(
                "header" => $this->modx->lexicon("modmonitor.parent"),
                "dataIndex" => 'parent',
            ),
            array(
                "xtype"=> "modmonitor-grid-urlcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-useridcolumn",
            ),
        );
        
        parent::loadCustomCssJs();
        
        $requests_grid_columns = json_encode($this->requests_grid_columns);
        
        # $requests_grid_columns = 'null';
        
        $this->addHtml("
        <script>
        Ext.onReady(function() {
        
            console.log({$requests_grid_columns});
        
            MODx.add({
                xtype: 'modmonitor-panel-panel'
                ,header_title: _('modmonitor.called_elements')
                ,items:[{
                    xtype: 'modmonitor-grid-requests'
                    ,columns: {$requests_grid_columns}
                }]
            });
        });
        </script>
        "
        );
    }
}




