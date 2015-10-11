<?php
$pkgName = 'modMonitor';
$pkgNameLower = strtolower($pkgName);

if ($object->xpdo) {
  switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
      $modx =& $object->xpdo;
      $modelPath = $modx->getOption("{$pkgNameLower}.core_path",null,$modx->getOption('core_path')."components/{$pkgNameLower}/").'model/';
      $modx->addPackage($pkgNameLower,$modelPath);

      $manager = $modx->getManager();
      $modx->setLogLevel(modX::LOG_LEVEL_ERROR);
      
      // adding xpdo objects
      $manager->createObjectContainer('modMonitorRequest');
      $manager->createObjectContainer('modMonitorRequestItem');

      $modx->setLogLevel(modX::LOG_LEVEL_INFO);

      break;
    case xPDOTransport::ACTION_UPGRADE:
      break;
  }
}
return true;