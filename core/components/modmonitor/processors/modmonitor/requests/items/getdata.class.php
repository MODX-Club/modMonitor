<?php

require_once __DIR__ . '/../../getdata.class.php';

class modModmonitorRequestsItemsGetdataProcessor extends modModmonitorGetdataProcessor{
    
    public $permission = "modmonitor.list_items";
    
    public $classKey = "modMonitorRequestItem";
    
    
    public function initialize(){
    
        $this->setDefaultProperties(array(
            "group_by_items"    => false,
            "sort"    => "id",
            "dir"    => "desc",
        ));
    
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        # var_dump((bool)$this->properties['group_by_items']);
        
        $where = array();
        
        if($this->getProperty("group_by_items")){
            $c->groupby("request_id, type, name");
        }
        
        if($request_id = (int)$this->getProperty("request_id")){
            $where['request_id'] = $request_id;
        }
        
        if($where){
            $c->where($where);
        }
        
        return $c;
    }
    
    public function setSelection(xPDOQuery $c){
        $c = parent::setSelection($c);
        
        $alias = $c->getAlias();
        
        if($this->getProperty("group_by_items")){
            $c->select(array(
                "count(DISTINCT {$alias}.id) as `total`",
                "sum({$alias}.time) as time",
                "sum({$alias}.db_queries) as db_queries",
                "sum({$alias}.db_queries_time) as db_queries_time",
            ));
        }
        
        return $c;
    }
    
}

return 'modModmonitorRequestsItemsGetdataProcessor';
