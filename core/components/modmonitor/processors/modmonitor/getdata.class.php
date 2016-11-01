<?php

require_once MODX_CORE_PATH . 'components/modxsite/processors/site/web/getdata.class.php';

abstract class modModmonitorGetdataProcessor extends modSiteWebGetdataProcessor{
    
    
    public function outputArray(array $array, $count = false){
        
        $result = parent::outputArray($array, $count);
        
        if($this->getProperty("format") == "grid"){
            $result = json_encode(array(
                "success"   => $result['success'],
                "message"   => $result['message'],
                'total'   => $count,
                "results"   => array_values((array)$result['object']),
            ));
        }
        
        
        return $result;
    }
    
    
    protected function getCount(xPDOQuery & $c){
        
        $alias = $c->getAlias();
        
        if(!$sortKey = $this->getProperty('sort')){
            $sortClassKey = $this->getSortClassKey();
            $sortKey = $this->modx->getSelectColumns($sortClassKey,$this->getProperty('sortAlias',$sortClassKey),'',array($this->getProperty('sort')));
        }
        
        $c = $this->prepareCountQuery($c);
        if(!$this->total = $this->countTotal($this->classKey,$c)){
            return false;
        }
        
        $c = $this->prepareQueryAfterCount($c);
        
        
        if($sortKey){
            $c->sortby($sortKey,$this->getProperty('dir'));
        }
        
        # $query = clone $c;
        
        $limit = intval($this->getProperty('limit'));
        $start = intval($this->getProperty('start'));
        
        if ($limit || $start) {
            $c->limit($limit,$start);
        }
        
        # $query = $this->prepareUniqObjectsQuery($query);
        # if($query->prepare() && $query->stmt->execute() && $rows = $query->stmt->fetchAll(PDO::FETCH_ASSOC)){
        #     # $IDs = array();
        #     # foreach($rows as $row){
        #     #     $IDs[] = $row['id'];
        #     # }
        #     # 
        #     # if ($this->flushWhere && isset($c->query['where'])) $c->query['where'] = array();
        #     # $c->where(array(
        #     #     "{$alias}.id:IN" => $IDs,
        #     # ));
        # }
        # else{
        #     
        #     if($query->stmt AND $query->stmt->errorCode() !== "00000"){
        #         $this->modx->log(xPDO::LOG_LEVEL_ERROR, __CLASS__);
        #         $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($query->stmt->errorInfo(), true));
        #         $this->modx->log(xPDO::LOG_LEVEL_ERROR, $query->toSQL());
        #     }
        #     
        #     return false;
        # }     
        
        return $c;
    }
}

return 'modModmonitorGetdataProcessor';
