<?php

require_once __DIR__ . '/../../getdata.class.php';


class modModmonitorRequestsTreeGetdataProcessor extends modModmonitorGetdataProcessor{
    
    public function initialize(){
        
        # if(!$this->getProperty("request_id")){
        #     return "Не был получен ID запроса";
        # }
        
        $node = $this->getProperty("node");
        
        if($node != "root"){
            $this->setProperty("request_id", (int)$node);
        }
        
        
        return parent::initialize();
    }
    
    
    public function process(){
        
        $result = array();
        
        $node = $this->getProperty("node");
        
        if($request_id = (int)$this->getProperty("request_id")){
            
            // Получаем все запросы
            $response = $this->modx->runProcessor("modmonitor/requests/getdata", array(
                "parent"    => $request_id,
                "limit"     => 0,
            ),array(
                'processors_path' => MODX_CORE_PATH . 'components/modmonitor/processors/',    
            ));
            
            if(!$response->isError() AND $objects = $response->getObject()){
                
                foreach($objects as & $object){
                    $object['text'] = "{$object['url']} Time: {$object['time']}";
                    $object['iconCls'] = "icon tree-context";
                    
                    $object['id'] = "request-{$object['id']}";
                }
                
                $result = array_merge($result, array_values($objects));
            }
            
            $this->modx->error->reset();
            
        }
        
        
        // Получаем все элементы запроса
        
        $params = array(
            # "request_id"    => $request_id,
            "limit"     => 0,
        );
        
        if(
            $node_array = explode("-", $node)
            AND $node_type = $node_array[0]
            AND ($node_type == 'request' OR $node_type == 'item')
            AND $node_id = (int)$node_array[1]
        ){
            
            if($node_type == 'item'){
                $params['where'] = array(
                    "parent"    => $node_id,
                );
            }
            else if($node_type == 'request'){
                # $params['request_id'] = $node_id;
                $params['where'] = array(
                    "request_id"    => $node_id,
                    "parent"    => 0,
                    # "OR:parent:="    => null,
                ); 
            }
            
        }
        else{
            
            $params['where'] = array(
                "request_id"    => $request_id,
                "parent"    => 0,
            ); 
        }
        
        $response = $this->modx->runProcessor("modmonitor/requests/items/getdata", $params,array(
            'processors_path' => MODX_CORE_PATH . 'components/modmonitor/processors/',    
        ));
        
        if(!$response->isError() AND $objects = $response->getObject()){
            
            foreach($objects as & $object){
                # $object['text'] = "({$object['id']}) {$object['type']} - {$object['name']}. Parent: {$object['parent']}. Time: {$object['time']} Request: {$object['request_id']}";
                
                $Properties = $object['properties'] ? "Properties: {$object['properties']}" : "";
                
                $object['text'] = "{$object['name']} Time: {$object['time']} {$Properties}";
                
                $iconCls = 'icon';
                
                switch($object['type']){
                    case 'modChunk':
                        $iconCls .= ' icon-th-large';
                        
                        break;
                        
                    case 'modSnippet':
                        $iconCls .= ' icon-code';
                        
                        break;
                        
                    default: 
                        $iconCls .= ' tree-resource';
                }
                
                
                
                
                $object['iconCls'] = $iconCls;
                
                $object['id'] = "item-{$object['id']}";
            }
            
            $result = array_merge($result, array_values($objects));
        }
            
        $this->modx->error->reset();
        
        
        # print_r($node_array);
        
        
        # return array(
        #     "success"   => 1,
        #     "message"   => '',
        #     "object"    => $result,
        # );
        
        return $this->outputArray($result, count($result));
    }
    
}


return 'modModmonitorRequestsTreeGetdataProcessor';
