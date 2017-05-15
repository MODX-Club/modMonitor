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
 'area' => 'default',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.add_javascript',
 'value' => 0,
 'xtype' => 'combo-boolean',
 'namespace' => NAMESPACE_NAME,
 'area' => 'default',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.exclude_contexts',
 'value' => 'mgr',
 'xtype' => 'textfield',
 'namespace' => NAMESPACE_NAME,
 'area' => 'default',
),'',true,true);

$settings[] = $setting;


$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.min_time_for_save',
 'value' => '',
 'xtype' => 'numberfield',
 'namespace' => NAMESPACE_NAME,
 'area' => 'default',
),'',true,true);

$settings[] = $setting;



$setting = $modx->newObject('modSystemSetting');
$setting->fromArray(array(
 'key' => 'modmonitor.collect_plugins_info',
 'value' => 0,
 'xtype' => 'combo-boolean',
 'namespace' => NAMESPACE_NAME,
 'area' => 'default',
),'',true,true);

$settings[] = $setting;


unset($setting,$setting_name);
return $settings;