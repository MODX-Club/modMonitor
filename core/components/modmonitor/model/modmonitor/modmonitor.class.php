<?php

class modMonitor{
    
    public $modx;
    public $xpdo;
    protected $connection;
    protected $request;
    protected $items = array();
    
    
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
        ));
        
        if(!$this->request){
            $this->request = $this->xpdo->newObject('modMonitorRequest', $data);
        }
        
        return (bool)$this->request;
    }
    
    
    public function saveRequest(){
        $saved = false;
        
        if(
            $this->request 
            AND $this->request->isNew()
        ){
            if($this->items){
                $this->request->addMany($this->items);
            }
            
            # print '<pre>';
            # print_r($this->request->toArray());
            # exit;
            
            $saved = $this->request->save();
        }
        
        return $saved;
    }
    
    public function addItem(array $data){
        # $data = array_merge();
        $added = false;
        
        if($this->request){
            $this->items[] = $this->xpdo->newObject('modMonitorRequestItem', $data);
            $added = true;
        }
        
        return $added;
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
