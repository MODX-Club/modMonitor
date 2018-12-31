<?php
$pkgName = 'modMonitor';
$pkgNameLower = strtolower($pkgName);

if ($object->xpdo) {
  switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
    case xPDOTransport::ACTION_UPGRADE:
      $modx =& $object->xpdo;
      $modelPath = $modx->getOption("{$pkgNameLower}.core_path",null,$modx->getOption('core_path')."components/{$pkgNameLower}/").'model/';
      $modx->addPackage($pkgNameLower,$modelPath);
      
      $manager = $modx->getManager();
      
      // adding xpdo objects
      $manager->createObjectContainer('modMonitorRequest');
      $manager->createObjectContainer('modMonitorRequestItem');



      $modx->setLogLevel(modX::LOG_LEVEL_FATAL);

      $manager->addField('modMonitorRequest', 'user_id');
      $manager->addIndex('modMonitorRequest', 'user_id');

      $manager->addField('modMonitorRequest', 'parent');
      $manager->addIndex('modMonitorRequest', 'parent');

      $manager->addField('modMonitorRequest', 'php_error');
      $manager->addIndex('modMonitorRequest', 'php_error');

      $manager->addField('modMonitorRequest', 'php_error_info');

      $manager->addField('modMonitorRequestItem', 'parent');
      $manager->addIndex('modMonitorRequestItem', 'parent');

      $manager->addField('modMonitorRequestItem', 'properties');

      $manager->addField('modMonitorRequest', 'referer');
      $manager->addIndex('modMonitorRequest', 'referer');

      $manager->addField('modMonitorRequest', 'user_agent');
      $manager->addIndex('modMonitorRequest', 'user_agent');
      
      $modx->setLogLevel(modX::LOG_LEVEL_INFO);

      break;
  }
}
return true;