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
        
}