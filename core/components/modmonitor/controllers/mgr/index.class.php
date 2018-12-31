<?php



class ModmonitorControllersMgrIndexManagerController extends modExtraManagerController{
    
    
    public function checkPermissions() {
        return $this->modx->hasPermission('modmonitor');
    }
    
    public function getPageTitle(){
        
        return "modMonitor";
    }
    
    public function initialize(){
        
        # print "<pre>";
        
        $assets_url = $this->modx->getOption("manager_url") . "components/modmonitor/";
        
        $connectors_url = "{$assets_url}connectors/";
        $connector_url = "{$connectors_url}connector.php";
        
        $this->config = array_merge((array)$this->config, array(
            "assets_url"        => $assets_url,
            "connectors_url"    => $connectors_url,
            "connector_url"     => $connector_url,
        ));
        
        # print_r($this->config);
        # 
        # exit;
        
        return parent::initialize();
    }
    
    public function getLanguageTopics() {
        
        $topics = (array)parent::getLanguageTopics();
        
        $topics[] = "modmonitor:default";
        
        return $topics;
    }
    
    public function registerBaseScripts() {
        
        
        parent::registerBaseScripts();
        
        # $this->addJavascript($this->config['assets_url'].'widgets/companies/contracts.grid.js');
        
        # $this->addCss($this->config['assets_url'].'css/modmonitor.css');
        
        $this->addJavascript($this->config['assets_url'].'js/modmonitor.js');
        $this->addJavascript($this->config['assets_url'].'js/widgets/modmonitor.tree.js');
        $this->addJavascript($this->config['assets_url'].'js/widgets/modmonitor.grid.js?v=2.5');
        $this->addJavascript($this->config['assets_url'].'js/widgets/modmonitor.panel.js');
        
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            modMonitor.config = '.$this->modx->toJSON($this->config).';
        });
        </script>');
        
    }
    
#     public function process(array $scriptProperties = array()) {
#         $placeholders = array();
# 
#         /* get user */
#         if (empty($scriptProperties['id']) || strlen($scriptProperties['id']) !== strlen((integer)$scriptProperties['id'])) {
#             return $this->failure("Не был указан ID компании");
#         }
#         
#         if(!$this->Company = $this->modx->getObject('YleyCompany', array('id' => $scriptProperties['id']))){
#             
#             return $this->failure("Не была получена компания");
#         }
#         
#         
#         return parent::process($scriptProperties);
#     }
}
