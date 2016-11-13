<?php
class modMonitorRequestItem extends xPDOSimpleObject {
    
    
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