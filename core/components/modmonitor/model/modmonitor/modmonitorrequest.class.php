<?php
class modMonitorRequest extends xPDOSimpleObject {
    
    
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
    
}