<?php
$events = array();

$event_name = 'OnModMonitorPrepareRequestQuery';
$event = $modx->newObject('modEvent', array(
  'service'   => 1,
  'groupname' => PKG_NAME,
)); 
$event->set('name', "{$event_name}");
$events[] = $event;

unset($event,$event_name);

return $events;