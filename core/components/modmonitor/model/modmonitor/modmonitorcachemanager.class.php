<?php

$this->loadClass("modCacheManager", "", true, true);

class modMonitorCacheManager extends modCacheManager{
    
    public function generateContext($key, array $options = array()) {
        $results = parent::generateContext($key, $options);
        
        $results['config']['InitedWithModMonitor'] = true;
        
        if(
            $this->xpdo->getOption("modmonitor.collect_plugins_info", null) == 1
            AND !empty($results['pluginCache'])
            AND $obj = $this->modx->getObject('modContext', $key, true)
            AND (is_object($obj) && $obj instanceof modContext && $obj->get('key'))
        ){
            
            
            
            $cache_key = $obj->getCacheKey();
        
            # print $key;
            
            
            // $cache = $modx->cacheManager->get("context_settings/". $key. "/context");
            # if($cache = $this->modx->cacheManager->get($cache_key, array(
            #     xPDO::OPT_CACHE_KEY => "context_settings",
            # ))){
                
                // $cache = $modx->cacheManager->getCacheKey();
                // print xPDO::OPT_CACHE_KEY;
                
                
                foreach($results['pluginCache'] as & $plugin){
                    $plugin['plugincode'] = '
                /*
                    modMonitor plugin debug
                */ 
$modmonitor = $modx->getService("modMonitor");
if($modmonitor){
    
    $modmonitor_start_time = microtime(true);
    
    
    $properties = array();
    
    if($scriptProperties){
        foreach($scriptProperties as $property){
            if(is_object($property)){
                continue;
            }
            $properties[] = $property;
        }
    }
    

    $modMonitorItem = $this->xpdo->newObject("modMonitorRequestItem", array(
        "type"  => "modPlugin",
        "name"  => $this->name,
        "properties"    => json_encode(array(
            "event"     => $modx->event->name,
            "properties"    => $properties,
        )),
    ));
}
            
$modx->modMonitor->addItem($modMonitorItem, false, true);

/**********************************************************/
                
                '. $plugin['plugincode'] . '

/*
    modMonitor plugin debug
*/ 
                
if(!empty($modMonitorItem)){

    $modmonitor_end_time = microtime(true);
    
    $modmonitor_total_time = round($modmonitor_end_time - $modmonitor_start_time, 4);
    
    $modMonitorItem->time = $modmonitor_total_time;
    // $modMonitorItem->time = $this->id;
    // $modMonitorItem->name = uniqid();
}

'                
;
                }
                
                $this->modx->cacheManager->set($cache_key, $results, 0, array(
                    xPDO::OPT_CACHE_KEY => "context_settings",
                ));
            }
            
        # }
        
        return $results;
    }
    
}
