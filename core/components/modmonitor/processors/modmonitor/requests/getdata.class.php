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
}

return 'modModmonitorRequestsGetdataProcessor';
