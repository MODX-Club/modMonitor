<?php
$xpdo_meta_map['modMonitorRequestItem']= array (
  'package' => 'modmonitor',
  'version' => '1.1',
  'table' => 'monitor_request_items',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'request_id' => NULL,
    'type' => NULL,
    'name' => NULL,
    'time' => NULL,
    'php_memory' => 0,
    'db_queries' => 0,
    'db_queries_time' => 0,
  ),
  'fieldMeta' => 
  array (
    'request_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'index',
    ),
    'type' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
    'time' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,4',
      'phptype' => 'float',
      'null' => false,
    ),
    'php_memory' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,2',
      'attributes' => 'unsigned',
      'phptype' => 'float',
      'null' => false,
      'default' => 0,
    ),
    'db_queries' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'db_queries_time' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,4',
      'attributes' => 'unsigned',
      'phptype' => 'float',
      'null' => false,
      'default' => 0,
    ),
  ),
  'indexes' => 
  array (
    'request_id' => 
    array (
      'alias' => 'request_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'request_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'type' => 
    array (
      'alias' => 'type',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'type' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'name' => 
    array (
      'alias' => 'name',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'name' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  "aggregates"  => array(
        "Request" => array(
            "class" => "modMonitorRequest",
            "cardinality"   => "one",
            "owner"         => "foreign",
            "local"         => "request_id",
            "foreign"       => "id",
        ),  
    ),
);
