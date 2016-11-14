<?php

class modModmonitorRequestsTruncateProcessor extends modObjectProcessor{
    
    public $permission = "modmonitor.truncate_data";
    
    public function getLanguageTopics() {
        return array("modmonitor:default");
    }
    
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
        
        // $this->modx->lexicon($str);
        return $this->success($this->modx->lexicon('modmonitor.clear_data_success'));
    }
    
}

return 'modModmonitorRequestsTruncateProcessor';
