<?php

require_once __DIR__ . '/modmonitorparser.class.php';

class modMonitorPdoParser extends pdoParser{
    use modMonitorParserTrait;
    
    
        /** {inheritDoc} */
	public function processElementTags($parentTag, & $content, $processUncacheable = false, $removeUnprocessed = false, $prefix = "[[", $suffix = "]]", $tokens = array(), $depth = 0) {
		$work = is_string($content) && empty($parentTag) && $processUncacheable && preg_match('#\{(\$|\/|\w+\s)#', $content, $match)
			&& !empty($this->pdoTools->config['useFenomParser']) && !empty($this->pdoTools->config['useFenom']);
		$tag = htmlentities(trim($content), ENT_QUOTES, 'UTF-8');
		$hash = sha1($tag);

        $start_time = microtime(true);
        
		if ($work && $modMonitor = & $this->modx->getService('modMonitor')) {
    		
            
			$parse_time = number_format(round(microtime(true) - $parse_time_start, 7), 7);
			$query_time = number_format(round($this->modx->queryTime - $query_time_start, 7), 7);
			$queries = $this->modx->executedQueries - $queries_start;

        
                
            $item = $this->modx->newObject("modMonitorRequestItem", array(
                "type"  => "fenomTemplate",
                "name"  => "fenomTemplate",       // Если будет еще modTemplate использоваться, там templatename, а не name
                "properties"    => mb_substr(htmlspecialchars($content), 0, 200, 'utf-8'),
            ));
            
            $modMonitor->addItem($item, $replaceItem = false);
                
            $result = parent::processElementTags($parentTag, $content, $processUncacheable, $removeUnprocessed, $prefix, $suffix, $tokens, $depth);
            
            $end_time = microtime(true);
            
            $total_time = round($end_time - $start_time, 4);
        
            $item->db_queries = $queries;
            $item->time = $total_time;
            
            $modMonitor->unsetItem($item);
            
		}
        else{
            $result = parent::processElementTags($parentTag, $content, $processUncacheable, $removeUnprocessed, $prefix, $suffix, $tokens, $depth);
        }
        

		return $result;
	}
    
    
}
