<?php
if(
    $modx->context->key == 'mgr'
    OR !$modMonitor = & $modx->getService('modMonitor')
){
    return;
}

switch($modx->event->name){
    
    case 'OnMODXInit':
        // $modx->setLogLevel(3);
        // $modx->setLogTarget('HTML');
        $parser_class = $modx->getOption('parser_class', null, 'modParser');
        
        if($parser_class != 'modParser'){
            $modx->log(1, "[ modMonitor plugin ]. Используется модифицированный парсер. modMonitor работает только с базовым парсером modParser");
            return;
        }
        
        // else
        unset($modx->services['parser']);
        
        $modx->setOption('parser_class', $modx->getOption('modmonitor.parser_class', null, 'modMonitorParser'));
        $modx->setOption('parser_class_path', $modx->getOption('modmonitor.parser_class_path', null, MODX_CORE_PATH . 'components/modmonitor/model/modmonitor/'));
        
        $modMonitor->createRequest();
        // die('ewfwef');
        
        break;
        
    case 'OnWebPageComplete':
        
        $memory = round(memory_get_usage()/1024/1024, 2);

        // print "<div>Memory: {$memory}</div>";
        
        $totalTime= (microtime(true) - $modx->startTime);
        $queryTime= $modx->queryTime;
        // $queryTime= sprintf("%2.4f s", $queryTime);
        $queries= isset ($modx->executedQueries) ? $modx->executedQueries : 0;
        // $totalTime= sprintf("%2.4f s", $totalTime);
        $phpTime= $totalTime - $queryTime;
        // $phpTime= sprintf("%2.4f s", $phpTime);
        // $modx->log(1, "<div>TotalTime: {$totalTime}</div>");
        
        $templete_properties = array();
        
        // $modx->log(1, get_class($modx->resource));
        // $modx->log(1, get_class($modx->resource->Template));
        
        
        
        if($templete = $modx->resource->Template){
            $templete_properties = $templete->getProperties();
        }
        
        $modMonitor->setRequestValue('db_queries', $queries);
        $modMonitor->setRequestValue('db_queries_time', round($queryTime, 4));
        $modMonitor->setRequestValue('php_memory', $memory);
        $modMonitor->setRequestValue('time', round($totalTime, 4));
        $modMonitor->setRequestValue('context_key', $modx->context->key);
        $modMonitor->setRequestValue('resource_id', isset($modx->resource) ? $modx->resource->id : null);
        $modMonitor->setRequestValue('phptemplates_non_cached', isset($templete_properties['phptemplates.non-cached']) ? (int)$templete_properties['phptemplates.non-cached'] : 0);
        
        // $modx->log(1, print_r($templete_properties, 1));
        
        $modMonitor->saveRequest();
        break;
}