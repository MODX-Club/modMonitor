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
        
        if($status = trim($this->getProperty("status"))){
            $cond = strpos($status, "!") === 0 ? "not like" : "like";
            
            $status = (int)preg_replace("/^\!/", "", $status);
            
            $where["http_status:{$cond}"] = "{$status}%";
        }
        
        if($where){
            $c->where($where);
        }
        
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
        
        return $c;
    }
}

return 'modModmonitorRequestsGetdataProcessor';
