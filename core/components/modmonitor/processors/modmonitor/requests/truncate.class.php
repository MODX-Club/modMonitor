<?php

class modModmonitorRequestsTruncateProcessor extends modObjectProcessor{
    
    public $permission = "modmonitor.truncate_data";
    
    
    public function process(){
        
        $classes = array(
            "modMonitorRequest",
            "modMonitorRequestItem",
        );
        
        foreach($classes as $class){
            if(
                $table = $this->modx->getTableName($class)
                AND $s = $this->modx->prepare("truncate table {$table}")
            ){
                $s->execute();
            }
        }
        
        return $this->success("Данные успешно очищены");
    }
    
}

return 'modModmonitorRequestsTruncateProcessor';
