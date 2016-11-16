<?php

class modMonitor{
    
    public $modx;
    public $xpdo;
    protected $connection;
    public $request;
    public $items = array();
    
    
    function __construct(xPDO $modx){
        $this->modx = & $modx;
        
        $this->getConnection();
    }
    
    
    public function getConnection(){
        
        if(!$this->connection){
            $modx_db = $this->modx->getOption('dbname', null);
            $dbase = $this->modx->getOption('modmonitor.dbname', null, $modx_db);
            
            if(
                $dbase 
                AND $dbase != $modx_db
            ){
                # $this->modx->log(1, "$modx_db");
                # $this->modx->log(1, "$dbase");
                
                $database_user = $this->modx->getOption('modmonitor.dbuser', null, $this->modx->getOption('username', null));
                $database_password = $this->modx->getOption('modmonitor.password', null, $this->modx->getOption('password', null));
                $table_prefix = $this->modx->getOption('modmonitor.table_prefix', null, $this->modx->getOption(xPDO::OPT_TABLE_PREFIX, null));
                $database_dsn = "mysql:host=localhost;dbname={$dbase};charset=utf8";
                
                $options = array(
                    # xPDO::OPT_CACHE_KEY => 'default',
                    # xPDO::OPT_CACHE_HANDLER => 'xPDOFileCache',
                    # xPDO::OPT_CACHE_PATH => $cachePath,
                    xPDO::OPT_TABLE_PREFIX => $table_prefix,
                    # xPDO::OPT_HYDRATE_FIELDS => true,
                    # xPDO::OPT_HYDRATE_RELATED_OBJECTS => true,
                    # xPDO::OPT_HYDRATE_ADHOC_FIELDS => true,
                    # xPDO::OPT_VALIDATOR_CLASS => 'validation.modValidator',
                    # xPDO::OPT_VALIDATE_ON_SAVE => true,
                    'cache_system_settings' => true,
                    'cache_system_settings_key' => 'system_settings'
                );
                
                $this->xpdo = new xPDO($database_dsn, $database_user, $database_password, $options);
                $this->connection = $this->xpdo->getConnection();
                
                $this->xpdo->addPackage('modmonitor', MODX_CORE_PATH . 'components/modmonitor/model/');
            }
            else{
                $this->connection = $this->modx->getConnection();
                $this->xpdo =& $this->modx;
            }
        }
        
        return $this->connection;
    }
    
    
    public function createRequest(array $data = array()){
        if($exclude_contexts = $this->modx->getOption("modmonitor.exclude_contexts", null)){
            if(in_array($this->modx->context->key, array_map("trim", explode(",", $exclude_contexts)))){
                return;
            }
        }
        
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        
        $data = array_merge($data, array(
            "uuid"  => $this->modx->uuid,
            "path"  => MODX_BASE_PATH,
            "site_url"  => MODX_SITE_URL,
            "ip"        => $ip,
            "url"       => $_SERVER['REQUEST_URI'],
            "parent"    => !empty($_SERVER['HTTP_MODMONITOR_OBJECT_ID']) ? (int)$_SERVER['HTTP_MODMONITOR_OBJECT_ID'] : null,
        ));
        
        
        if(!$this->request){
            $this->request = $this->xpdo->newObject('modMonitorRequest', $data);
        }
        
        return (bool)$this->request;
    }
    
    
    public function saveRequest(){
        $modx = & $this->modx;
        
        if(
            !$this->request 
            # OR !$this->request->isNew()
        ){
            return;
        }
        
        if($this->items){
            $this->request->addMany($this->items);
            unset($this->items);
        }
        
        # print_r("wfwef");
        
        # print '<pre>';
        # print_r($this->request->toArray());
        # exit;
        
    
        $memory = round(memory_get_usage()/1024/1024, 2);

        // print "<div>Memory: {$memory}</div>";
        
        $totalTime= (microtime(true) - $modx->startTime);
        $queryTime= $modx->queryTime;
        // $queryTime= sprintf("%2.4f s", $queryTime);
        $queries= isset ($modx->executedQueries) ? $modx->executedQueries : 0;
        // $totalTime= sprintf("%2.4f s", $totalTime);
        $phpTime= $totalTime - $queryTime;
        // $phpTime= sprintf("%2.4f s", $phpTime);
        // $modx->log(1, "<div>TotalTime: {$totalTime}</div>");
        
        $templete_properties = array();
        
        // $modx->log(1, get_class($modx->resource));
        // $modx->log(1, get_class($modx->resource->Template));
        
        
        if(!empty($modx->resource) AND $templete = $modx->resource->Template){
            $templete_properties = $templete->getProperties();
        }
        
        $this->setRequestValue('db_queries', $queries);
        $this->setRequestValue('db_queries_time', round($queryTime, 4));
        $this->setRequestValue('php_memory', $memory);
        $this->setRequestValue('time', round($totalTime, 4));
        $this->setRequestValue('context_key', $modx->context->key);
        $this->setRequestValue('resource_id', isset($modx->resource) ? $modx->resource->id : null);
        $this->setRequestValue('phptemplates_non_cached', isset($templete_properties['phptemplates.non-cached']) ? (int)$templete_properties['phptemplates.non-cached'] : 0);
        $this->setRequestValue('user_id', $modx->user->id);
        $this->setRequestValue('from_cache', !$modx->resourceGenerated);
        
        
        $this->request->fromArray(array(
            "http_status"    => http_response_code(),
        ));
        
        $errors = error_get_last();
        
        if(
            $min_time_for_save = (float)$this->modx->getOption("modmonitor.min_time_for_save", null)
            AND $min_time_for_save > $this->request->time
            AND $this->request->http_status == 200
            AND !$errors
        ){
            return;
        }
        
        if($errors){
            $this->request->fromArray(array(
                "php_error"    => $errors['type'],
                "php_error_info"    => $errors,
            ));
        }
        
        $this->request->save();
        
        # $this->modx->resource->_output = '';
        
        # if (!empty($this->request) AND $this->request->id) {
        #     
        #     
        #     
        # }
    }
    
    
    public function shutdown(){
        
        
        
        $this->saveRequest();
        

        
    }
    
    
    # public function addItem($object){
    #     # $data = array_merge();
    #     $added = false;
    #     
    #     if(!is_object($object)){
    #         $object = $this->xpdo->newObject('modMonitorRequestItem', $object);
    #     }
    #     else if(!($object instanceof modMonitorRequestItem)){
    #         return $added;
    #     }
    #     
    #     if($this->request){
    #         
    #         if(empty($this->item)){
    #             $this->items[] = $object;
    #         }
    #         else{
    #             $children = $this->item->Children;
    #             $children[] = $object;
    #             $this->item->Children = $children;
    #         }
    #         
    #         $this->item = $object;
    #         
    #         $added = true;
    #     }
    #     
    #     return $added;
    # }
    
    public function addItem($object, $replaceItem = true, $addAsChild = true){
        # $data = array_merge();
        $added = false;
        
        if(!is_object($object)){
            $object = $this->xpdo->newObject('modMonitorRequestItem', $object);
        }
        else if(!($object instanceof modMonitorRequestItem)){
            return $added;
        }
        
        if($this->request){
            
            if(empty($this->item) || !$addAsChild){
                $this->items[] = $object;
            }
            else{
                $children = $this->item->Children;
                $children[] = $object;
                $this->item->Children = $children;
            }
            
            if($replaceItem){
                $this->item = $object;
            }
            
            $added = true;
        }
        
        return $added;
    }
    
    public function unsetItem($item){
        if($this->item === $item){
            $this->item = null;
        }
    }
    
    
    public function setRequestValue($field, $value){
        $setted = false;
        
        if($this->request){
            switch($field){
                
                case 'db_queries':
                case 'db_queries_time':
                case 'php_memory':
                case 'time':
                case 'context_key':
                case 'resource_id':
                case 'phptemplates_non_cached':
                case 'user_id':
                case 'from_cache':
                    
                    break;
                    
                default: return $setted;
            }
            
            $setted = $this->request->set($field, $value);
        }
        
        
        return $setted;
    }
    
}
