<?php

require_once __DIR__ . '/../getdata.class.php';

class modModmonitorRequestsGetdataProcessor extends modModmonitorGetdataProcessor{
    
    public $permission = "modmonitor.list_requests";
    
    public $classKey = "modMonitorRequest";
    
    
    public function initialize(){
    
        $this->setDefaultProperties(array(
            "sort"    => "id",
            "dir"    => "desc",
        ));
    
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $where = array();
        
        if($parent = (int)$this->getProperty("parent")){
            $where['parent'] = $parent;
        }
        
        if($query = trim($this->getProperty("query"))){
            
            if(
                is_numeric($query) 
                AND $query = (int)$query
            ){
                $c->where(array(
                    "resource_id"   => $query,
                    "OR:id:="       => $query,
                ));
            }
            else{
                $where['url:like']  = $query;
            }
        }
        
        if($time = (float)$this->getProperty("time")){
            $where['time:>=']    = $time;
        }
        
        if($context = trim($this->getProperty("context"))){
            if(
                $ctx = $this->modx->getObject("modContext", $context)
                AND $ctx->checkPolicy("load")
            ){
                $where['context_key']   = $context;
            }
            else{
                $where[] = "1 = 0";
            }
        }
        
        if($from_cache = (int)$this->getProperty("from_cache")){
            $where['from_cache']    = $from_cache == 1 ? 1: "";
        }
        
        if(
            $http_status = trim($this->getProperty("http_status"))
            OR $http_status = trim($this->getProperty("status"))
        ){
            $cond = strpos($http_status, "!") === 0 ? "not like" : "like";
            
            $http_status = (int)preg_replace("/^\!/", "", $http_status);
            
            $where["http_status:{$cond}"] = "{$http_status}%";
        }
        
        if($php_error = trim($this->getProperty("php_error"))){
            
            if(preg_match("/^([\<\>\=]+)([0-9]+)$/", $php_error, $match)){
                $cond = $match[1];
                $php_error = (int)$match[2];
                $c->where(array(
                    "php_error:!="  => 0,
                ));
            }
            else if($php_error == "*"){
                $cond = "!=";
                $php_error = "0";
            }
            else{
                $cond = "=";
                $php_error = (int)$php_error;
            }
            
            $where["php_error:{$cond}"] = "{$php_error}";
        }
        
        
        if($user_agent = trim($this->getProperty("user_agent"))){
            $cond = strpos($user_agent, "!") === 0 ? "not like" : "like";
            
            $user_agent = preg_replace("/^\!/", "", $user_agent);
            
            if($user_agent == '*'){
                $user_agent = '%';
            }
            
            $c->where(array(
                "user_agent:!="     => "",
                "and:user_agent:{$cond}"    => "{$user_agent}",
            ));
            
        }
        
        
        if($referer = trim($this->getProperty("referer"))){
            $cond = strpos($referer, "!") === 0 ? "not like" : "like";
            
            $referer = preg_replace("/^\!/", "", $referer);
            
            if($referer == '*'){
                $referer = '%';
            }
            
            $c->where(array(
                "referer:!="     => "",
                "and:referer:{$cond}"    => "{$referer}",
            ));
            
        }
        
        if($where){
            $c->where($where);
        }
        
        $this->modx->invokeEvent("OnModMonitorPrepareRequestQuery", array(
            "processor" => & $this,
            "query" => & $c,
        ));
        
        # $c->prepare();
        # print $c->toSQL();
        
        return $c;
    }
    
    
    public function afterIteration(array $list) {
        $list = parent::afterIteration($list);
        
        foreach($list as & $l){
            if(!empty($l['resource_id'])){
                $l['resource_url'] = $this->modx->makeUrl($l['resource_id'], '', '', 'full');
            }
        }
        
        return $list;
    }
    
    
    public function setSelection(xPDOQuery $c){
        $c = parent::setSelection($c);
        
        $alias = $c->getAlias();
        
        $c->leftJoin("modUser", "user", "user.id = {$alias}.user_id");
        
        $c->select(array(
            "user.username",
        ));
        
        if(!$this->modx->hasPermission("modmonitor.view_ips")){
            $c->select(array(
                "'denied to view' as `ip`",
            ));
        }
        
        if(!$this->modx->hasPermission("modmonitor.view_uuid")){
            $c->select(array(
                "'denied to view' as `uuid`",
            ));
        }
        
        if(!$this->modx->hasPermission("modmonitor.view_path")){
            $c->select(array(
                "'denied to view' as `uuid`",
            ));
        }
        
        if(!$this->modx->hasPermission("modmonitor.view_path")){
            $c->select(array(
                "'denied to view' as `path`",
            ));
        }
        
        # $c->prepare();
        # print $c->toSQL();
        
        return $c;
    }
}

return 'modModmonitorRequestsGetdataProcessor';
