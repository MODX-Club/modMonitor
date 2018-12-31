<?php

$this->loadClass('modSnippet');
$this->loadClass('modChunk');
$this->loadClass('modTemplateVar');


trait modMonitorParserTrait{
    
    # protected $debug = false;
    
    public $item;
    protected $child_item;
    
    # function __construct(xPDO &$modx){
    #     
    #     # $this->debug = $modx->getOption('modmonitor.debug', null, false);
    #     
    #     # die('modMonitorParser' . __FILE__);
    #     return parent::__construct($modx);
    # }
    
    
    public function getElement($class, $name) {
        
        
        
        # $this->debug(1, $class);
        # $this->debug(1, $name);
        $realname = $this->realname($name);
        
        $element = parent::getElement($class, $name);
        
        if($element){
            $object = null;
            
            switch($class){
                
                case 'modSnippet':
                    $object = new modMonitorSnippet($this->modx);
                    # $object->setObject($element);
                    # $element = $object;
                    break;
                
                case 'modChunk':
                    $object = new modMonitorChunk($this->modx);
                    # $object->setObject($element);
                    # $element = $object;
                    break;
                
                case 'modTemplateVar':
                    $object = new modMonitorTemplateVar($this->modx);
                    # $element = $object;
                    break;
                    
                default:;
            }
            
            if($object){
                
                $object->setObject($element);
                $object->fromArray($element->toArray());
                $object->id = $element->id;
                # $object->name = $element->name;
                $object->_processed = $element->_processed;
                $object->_new = false;
                # $object->_processed = false;
                
                # $object->setCacheable($element->isCacheable());
                # 
                # unset($element);
                $element = $object;
                # 
                # print $element->id;
            }
            
            # if($element->id == 93){
            #     print "{$element->id}) ";
            #     print (int)$element->isCacheable();
            #     print "Local processed: " . (int)$element->_processed;
            #     # exit;
            # }
        }
        else{
            $this->modx->log( ($this->modx->getOption("modmonitor.debug", null) ? 1 : 2), "Не был получен элемент {$class} '{$realname}'");
        }
        
        return $element;
    }
    
    # public function runSnippet($snippetName, array $params= array ()) {
    #     $output= '';
    #     if ($this->getParser()) {
    #         $snippet= $this->parser->getElement('modSnippet', $snippetName);
    #         if ($snippet instanceof modSnippet) {
    #             $snippet->setCacheable(false);
    #             $output= $snippet->process($params);
    #         }
    #     }
    #     return $output;
    # }
    
    # protected function debug($msg){
    #     if($this->debug){
    #         $this->xpdo->log(1, $msg);
    #     }
    #     return;
    # }
    
}


class modMonitorParser extends modParser{
    use modMonitorParserTrait;
}


trait modMonitorElement {

    protected $object;
    
    public function setObject(modElement $object){
        $this->object =& $object;
    }
    
    function process($properties= null, $content= null){
        $object = & $this->object;
        $class = $object->_class;
        
        $modMonitor = & $this->xpdo->getService('modMonitor');
        
        # $start_time = round(microtime(true), 4);
        $start_time = microtime(true);
        # $this->xpdo->debug(1, "start_time: {$start_time}");
        
        if($modMonitor){
            
            $item = $this->xpdo->newObject("modMonitorRequestItem", array(
                "type"  => $class,
                "name"  => $object->name,       // Если будет еще modTemplate использоваться, там templatename, а не name
            ));
            
            $modMonitor->addItem($item, $replaceItem = false);
            
        }
        
        $result = $object->process($properties, $content);
        
        # $end_time = round(microtime(true), 4);
        $end_time = microtime(true);
        # $this->xpdo->debug(1, "end_time: " . $end_time);
        
        $total_time = round($end_time - $start_time, 4);
        
        # $this->xpdo->debug(1, "total_time: " .$total_time);
        
        
        if($modMonitor){
            
            $item->db_queries = 0;
            $item->time = $total_time;
            
            if(isset($properties)){
                
                if(is_array($properties)){
                    array_walk_recursive($properties, function(& $item, $i){
                        if(is_scalar($item)){
                            $item = htmlspecialchars($item);
                        }
                    });
                    
                    $properties = json_encode($properties);
                }
                else{
                    $properties = htmlspecialchars($properties);
                }
            }
            
            $item->properties = $properties;
            
            $modMonitor->unsetItem($item);
        }
        
        if($this->xpdo->getOption('modmonitor.debug', null, false)){
            $this->xpdo->log(1, "[{$class} '{$object->name}']. Время выполнения: " . $total_time);
        }
        
        return $result;
    }
    
    function setCacheable($cacheable = true){
        parent::setCacheable($cacheable);
        $this->object->setCacheable($cacheable);
    }
    
    public function setTag($tag) {
        parent::setTag($tag);
        $this->object->setTag($tag);
    }
    
    public function set($k, $v= null, $vType= '') {
        parent::set($k, $v, $vType);
        $this->object->set($k, $v, $vType);
    }
}


class modMonitorSnippet extends modSnippet{
    use modMonitorElement;
    
    # protected $object;
    # 
    # public function setObject(modSnippet $object){
    #     return parent::setObject($object);
    # }
    
    # function process($properties= null, $content= null){
    #     $object = & $this->object;
    #     
    #     # $start_time = round(microtime(true), 4);
    #     $start_time = microtime(true);
    #     $this->xpdo->debug(1, "start_time: {$start_time}");
    #     
    #     $result = $object->process($properties, $content);
    #     
    #     # $end_time = round(microtime(true), 4);
    #     $end_time = microtime(true);
    #     $this->xpdo->debug(1, "end_time: " . $end_time);
    #     
    #     $total_time = round($end_time - $start_time, 4);
    #     
    #     $this->xpdo->debug(1, "total_time: " .$total_time);
    #     $this->xpdo->debug(1, "Сниппет: {$object->name}. Время выполнения: " . $total_time);
    #     return $result;
    # }
}


class modMonitorChunk extends modChunk{
    
    use modMonitorElement;
    
    # protected $object;
    # 
    # public function setObject(modChunk $object){
    #     return parent::setObject($object);
    # }
    # 
    # function process($properties= null, $content= null){
    #     $object = & $this->object;
    #     
    #     $start_time = microtime(true);
    #     $result = $object->process($properties, $content);
    #     $total_time = microtime(true) - $start_time;
    #     $this->xpdo->debug(1, "Чанк: {$object->name}. Время выполнения: " . $total_time);
    #     return $result;
    # }
}


class modMonitorTemplateVar extends modTemplateVar{
    
    use modMonitorElement;
    
    # protected $object;
    # 
    # public function setObject(modChunk $object){
    #     return parent::setObject($object);
    # }
    # 
    # function process($properties= null, $content= null){
    #     $object = & $this->object;
    #     
    #     $start_time = microtime(true);
    #     $result = $object->process($properties, $content);
    #     $total_time = microtime(true) - $start_time;
    #     $this->xpdo->debug(1, "Чанк: {$object->name}. Время выполнения: " . $total_time);
    #     return $result;
    # }
}

