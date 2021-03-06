<?php

require_once __DIR__ . '/../index.class.php';

class ModmonitorControllersMgrRequestsIndexManagerController extends ModmonitorControllersMgrIndexManagerController{
    
    public $requests_grid_fields = array();
    public $requests_grid_columns = array();
    public $requests_grid_filters = array();
    
    public function registerBaseScripts() {
        
        parent::registerBaseScripts();
        
        $this->requests_grid_fields = array (
            'id',
            'parent',
            'url',
            'date',
            'context_key',
            'site_url',
            'resource_id',
            'http_status',
            'user_id',
            'username',
            'ip',
            'time',
            'php_memory',
            'db_queries',
            'db_queries_time',
            'from_cache',
            'resource_url',
            'php_error',
            'php_error_info',
            'referer',
            'user_agent',
            'menu',
        );
        
        
        $this->requests_grid_columns = array(
            array(
                "header" => $this->modx->lexicon("modmonitor.request_id"),
                "dataIndex" => 'id',
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.parent"),
                "dataIndex" => 'parent',
                "width"     => 80,
                "hidden"    => true,
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.context_key"),
                "dataIndex" => 'context_key',
                "width"     => 80,
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.date"),
                "dataIndex" => 'date',
                "width"     => 160,
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.resource_id"),
                "dataIndex" => 'resource_id',
            ),
            array(
                "header" => $this->modx->lexicon("IP"),
                "dataIndex" => 'ip',
                "width"     => 130,
                "hidden"    => true,
            ),
            array(
                "xtype"=> "modmonitor-grid-urlcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-useridcolumn",
            ),
            array(
                "xtype"=> "modmonitor-grid-referercolumn",
                "width"     => 200,
            ),
            array(
                "xtype"=> "modmonitor-grid-useragentcolumn",
                "width"     => 200,
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
                "hidden"    => true,
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.db_queries"),
                "dataIndex" => 'db_queries',
                "hidden"    => true,
            ),
            array(
                "header" => $this->modx->lexicon("modmonitor.db_queries_time"),
                "dataIndex" => 'db_queries_time',
                "hidden"    => true,
            ),
            array(
                "xtype"=> "modmonitor-grid-fromcachecolumn",
            ),
        );
        
        
        $this->requests_grid_filters = array(
            array(
                "xtype"=> "modmonitor-grid-querysearchfield",
            ),
            array(
                "xtype"=> "textfield",
                "name"=> "referer",
                "emptyText" => $this->modx->lexicon("modmonitor.referer"),
                "width" => 110,
            ),
            array(
                "xtype"=> "textfield",
                "name"=> "user_agent",
                "emptyText" => $this->modx->lexicon("modmonitor.user_agent"),
                "width" => 110,
            ),
            array(
                "xtype"=> "modmonitor-grid-runtimesearchfield",
            ),
            array(
                "xtype"=> "modmonitor-grid-cachesearchfield",
            ),
            array(
                "xtype"=> "modmonitor-grid-contextsearchfield",
            ),
            array(
                "xtype"=> "textfield",
                "name"=> "http_status",
                "emptyText" => $this->modx->lexicon("modmonitor.http_status"),
                "width" => 110,
            ),
            array(
                "xtype"=> "modmonitor-grid-phperrorsearchfield",
            ),
        );
        
        
    }
    
    
    public function loadCustomCssJs() {
        
        parent::loadCustomCssJs();
        
        
        $requests_grid_fields = json_encode($this->requests_grid_fields);
        $requests_grid_columns = json_encode($this->requests_grid_columns);
        $requests_grid_filters = json_encode($this->requests_grid_filters);
        
        # $requests_grid_columns = 'null';
        
        $this->addHtml("
        <script>
        Ext.onReady(function() {
        
            MODx.add({
                xtype: 'modmonitor-panel-panel'
                ,header_title: _('modmonitor.called_elements')
                ,items:[{
                    xtype: 'modmonitor-grid-requests'
                    ,fields: {$requests_grid_fields}
                    ,columns: {$requests_grid_columns}
                    ,filters: {$requests_grid_filters}
                }]
            });
        });
        </script>
        "
        );
    }
}




