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
                "header" => $this->modx->lexicon("modmonitor.context_key"),
                "dataIndex" => 'context_key',
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.date"),
                "dataIndex" => 'date',
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.resource_id"),
                "dataIndex" => 'resource_id',
            ),
            array(
                "header" => $this->modx->lexicon("IP"),
                "dataIndex" => 'ip',
            ),
            array(
                "xtype"=> "modmonitor-grid-urlcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-useridcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-httpstatuscolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-phperrorcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-timecolumn",
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.php_memory"),
                "dataIndex" => 'php_memory',
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.db_queries"),
                "dataIndex" => 'db_queries',
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.db_queries_time"),
                "dataIndex" => 'db_queries_time',
            ),
            array(
                "xtype"=> "modmonitor-grid-fromcachecolumn",
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




