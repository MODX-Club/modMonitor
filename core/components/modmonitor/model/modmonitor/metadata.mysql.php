<?php

if(
    $cache_manager = $this->getCacheManager()
    AND get_class($cache_manager) == "modCacheManager"
){
    $this->cacheManager = null;
    $this->setOption("modCacheManager.class", "modMonitorCacheManager");
    $this->getCacheManager("modMonitorCacheManager", array(
        "path"      => "",
        "ignorePkg" => false,
    ));
}

