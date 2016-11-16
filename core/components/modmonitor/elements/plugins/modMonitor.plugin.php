<?php
if(
    // $modx->context->key == 'mgr'
    // OR 
    !$modMonitor = & $modx->getService('modMonitor')
){
    return;
}

switch($modx->event->name){
    
    case 'OnMODXInit':
        // $modx->setLogLevel(3);
        // $modx->setLogTarget('HTML');
        
        # print class_exists("modParser");
        # exit;
        
        register_shutdown_function(array (
            & $modMonitor,
            "shutdown"
        ));
        
        if(!$modx->context->getOption("InitedWithModMonitor", null)){
            $modx->context->prepare(true);
        }
        
        if(!$new_parser_class = $modx->getOption('modmonitor.parser_class', null)){
            
            $parser_class = $modx->getOption('parser_class', null, 'modParser');
            # $parser_class_path = $modx->getOption('parser_class_path', null, 'modParser');
            
            switch($parser_class){
                
                case "modParser":
                    $new_parser_class = "modMonitorParser";
                    break;
                
                case "pdoParser":
                    $new_parser_class = "modMonitorPdoParser";
                    break;
                
                case "fastFieldParser":
                    $new_parser_class = "modMonitorFastFieldParser";
                    break;
                    
                    
                default: 
                    $modx->log(1, "[ modMonitor plugin ]. Используется модифицированный парсер. modMonitor работает только с базовым парсером modParser и с pdoParser.");
                    return;
            }
            
            # $modx->setOption('modmonitor.original_parser_class', $parser_class);
        }
        
        if($new_parser_class){
            
            # print $new_parser_class;
            # 
            # exit;
            
            // else
            unset($modx->services['parser']);
            
            $modx->setOption('parser_class', $new_parser_class);
            $modx->setOption('parser_class_path', $modx->getOption('modmonitor.parser_class_path', null, MODX_CORE_PATH . 'components/modmonitor/model/modmonitor/parser/'));
            
            $modMonitor->createRequest();
        }
        
        // die('ewfwef');
        
        // register_shutdown_function($modMonitor->shutdown);
        
        
        break;
        
    case 'OnWebPagePrerender':
        
        $modMonitor->saveRequest();
        
        if($modx->getOption('modmonitor.add_javascript', null)){
            if(!empty($modMonitor->request->id) AND strpos($modx->resource->_output, '</head>') !== false){
                $js = "<script type=\"text/javascript\">
                    window.modMonitorObjectId = {$modMonitor->request->id};
                    (function(open) { 
                        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
                            open.call(this, method, url, async, user, pass);
                            this.setRequestHeader('modmonitor-object-id', window.modMonitorObjectId);
                        };
                    })(XMLHttpRequest.prototype.open);
                </script>";
                
                $modx->resource->_output= preg_replace("/(<\/head>)/i", $js . "\n\\1", $modx->resource->_output,1);
            }
        }
        
        
        
        break;
        
    # case 'OnCacheUpdate':
    #     
    #     # print_r($paths['context_settings']['contexts']);
    #     # print_r($paths['context_settings']['contexts']);
    #     
    #     # if(!empty($paths['context_settings']['contexts'])){
    #     #     
    #     #     
    #     # }
    #     
    #     # print_r($results);
    #     
    #     # print_r($results['context_settings']['web']);
    #     
    #     # $modx->setLogTarget("FILE");
    #     # $modx->log(1, print_r($scriptProperties, 1));
    #     
    #     
    #     if(!empty($results['context_settings'])){
    #         foreach($results['context_settings'] as $key => $status){
    #             
    #         
    #             if($status !== true){
    #                 continue;
    #             }
    #             
    #             # print_r($results['context_settings']);
    #             
    #             $cache_key = "{$key}/context";
    #     
    #             # print $key;
    #             
    #             
    #             // $cache = $modx->cacheManager->get("context_settings/". $key. "/context");
    #             if($cache = $modx->cacheManager->get($cache_key, array(
    #                 xPDO::OPT_CACHE_KEY => "context_settings",
    #             ))){
    #                 
    #                 // $cache = $modx->cacheManager->getCacheKey();
    #                 // print xPDO::OPT_CACHE_KEY;
    #                 
    #                 
    #                 foreach($cache['pluginCache'] as & $plugin){
    #                     $plugin['plugincode'] = "
    #                 /*
    #                     modMonitor plugin
    #                 */    
    #                 
    #                 ". $plugin['plugincode'];
    #                 }
    #                 
    #                 $modx->cacheManager->set($cache_key, $cache, 0, array(
    #                     xPDO::OPT_CACHE_KEY => "context_settings",
    #                 ));
    #             }
    #         }
    #     }
    #     
    #     
    #     
    #     break;
        
}