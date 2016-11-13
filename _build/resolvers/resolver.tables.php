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
      $modx->setLogLevel(modX::LOG_LEVEL_ERROR);
      
      // adding xpdo objects
      $manager->createObjectContainer('modMonitorRequest');
      $manager->createObjectContainer('modMonitorRequestItem');

      $manager->addField('modMonitorRequest', 'user_id');
      $manager->addIndex('modMonitorRequest', 'user_id');

      $manager->addField('modMonitorRequest', 'parent');
      $manager->addIndex('modMonitorRequest', 'parent');

      $manager->addField('modMonitorRequestItem', 'parent');
      $manager->addIndex('modMonitorRequestItem', 'parent');

      $manager->addField('modMonitorRequestItem', 'properties');
      
      $modx->setLogLevel(modX::LOG_LEVEL_INFO);

      break;
  }
}
return true;