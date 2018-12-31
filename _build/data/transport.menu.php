<?php

$menus = array();


$menu = $modx->newObject('modMenu');
$menu->fromArray(array(
  'text' => NAMESPACE_NAME,
  'parent' => 'components',
  'description' => NAMESPACE_NAME.'_desc',
  'action' => '',
  # 'icon' => 'images/icons/plugin.gif',
  'menuindex' => 0,
  'params' => '',
  'handler' => '',
  'permissions'   => 'modmonitor',
  'namespace' => NAMESPACE_NAME,
),'',true,true);

$menus[] = $menu;


$menu = $modx->newObject('modMenu');
$menu->fromArray(array(
  'parent' => NAMESPACE_NAME,
  'text' => NAMESPACE_NAME . "_requests_detailed",
  'description' => NAMESPACE_NAME.'_requests_detailed_desc',
  'action' => 'controllers/mgr/requests/index',
  # 'icon' => 'images/icons/plugin.gif',
  'menuindex' => 0,
  'params' => '',
  'handler' => '',
  'permissions'   => 'modmonitor',
  'namespace' => NAMESPACE_NAME,
),'',true,true);

$menus[] = $menu;


$menu = $modx->newObject('modMenu');
$menu->fromArray(array(
  'parent' => NAMESPACE_NAME,
  'text' => NAMESPACE_NAME . "_requests_items",
  'description' => NAMESPACE_NAME.'_requests_items_desc',
  'action' => 'controllers/mgr/requests/items/index',
  # 'icon' => 'images/icons/plugin.gif',
  'menuindex' => 0,
  'params' => '',
  'handler' => '',
  'permissions'   => 'modmonitor',
  'namespace' => NAMESPACE_NAME,
),'',true,true);

$menus[] = $menu;


unset($menu);

return $menus;