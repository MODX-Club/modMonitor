<?php

$settings = array();

# $setting_name = PKG_NAME_LOWER.'.setting';

$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.dbname',
 'value' => '',
 'xtype' => 'textfield',
 'namespace' => NAMESPACE_NAME,
 'area' => 'connection',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.dbuser',
 'value' => '',
 'xtype' => 'textfield',
 'namespace' => NAMESPACE_NAME,
 'area' => 'connection',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.password',
 'value' => '',
 'xtype' => 'textfield',
 'namespace' => NAMESPACE_NAME,
 'area' => 'connection',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.debug',
 'value' => 0,
 'xtype' => 'combo-boolean',
 'namespace' => NAMESPACE_NAME,
 'area' => 'connection',
),'',true,true);

$settings[] = $setting;


unset($setting,$setting_name);
return $settings;