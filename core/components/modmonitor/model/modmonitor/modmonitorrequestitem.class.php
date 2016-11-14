<?php
class modMonitorRequestItem extends xPDOSimpleObject {
    
    public function set($k, $v= null, $vType= '') {
        
        switch($k){
            case 'parent':
                if(!$v){
                    $v = 0;
                }
                break;
        }
        
        return parent::set($k, $v, $vType);
    }
    
    public function save($cacheFlag= null) {
        
        if($this->request_id){
            
            if (!empty ($this->_relatedObjects['Children'])) {
                foreach ($this->_relatedObjects['Children'] as & $ro){
                    if(!$ro->request_id){
                        $ro->request_id = $this->request_id;
                    }
                }
            }
            
        }
        
        return parent::save($cacheFlag= null);
    }
    
}