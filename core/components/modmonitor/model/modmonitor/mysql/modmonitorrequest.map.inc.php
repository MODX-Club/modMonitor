<?php
$xpdo_meta_map['modMonitorRequest']= array (
  'package' => 'modmonitor',
  'version' => '1.1',
  'table' => 'monitor_requests',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'path' => NULL,
    'site_url' => NULL,
    'url' => NULL,
    'context_key' => NULL,
    'resource_id' => NULL,
    'http_status' => 200,
    'uuid' => NULL,
    'ip' => NULL,
    'date' => 'CURRENT_TIMESTAMP',
    'from_cache' => '0',
    'phptemplates_non_cached' => '0',
    'time' => NULL,
    'php_memory' => 0,
    'db_queries' => 0,
    'db_queries_time' => 0,
  ),
  'fieldMeta' => 
  array (
    'path' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
    'site_url' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
    ),
    'url' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '1024',
      'phptype' => 'string',
      'null' => false,
    ),
    'context_key' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
    ),
    'resource_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
      'index' => 'index',
    ),
    'http_status' => 
    array (
      'dbtype' => 'smallint',
      'precision' => '6',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 200,
    ),
    'uuid' => 
    array (
      'dbtype' => 'char',
      'precision' => '36',
      'phptype' => 'string',
      'null' => false,
    ),
    'ip' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '15',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
    'date' => 
    array (
      'dbtype' => 'timestamp',
      'phptype' => 'timestamp',
      'null' => false,
      'default' => 'CURRENT_TIMESTAMP',
      'index' => 'index',
    ),
    'from_cache' => 
    array (
      'dbtype' => 'enum',
      'precision' => '\'0\',\'1\'',
      'phptype' => 'string',
      'null' => false,
      'default' => '0',
    ),
    'phptemplates_non_cached' => 
    array (
      'dbtype' => 'enum',
      'precision' => '\'0\',\'1\'',
      'phptype' => 'string',
      'null' => false,
      'default' => '0',
    ),
    'time' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,4',
      'attributes' => 'unsigned',
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
    'uuid' => 
    array (
      'alias' => 'uuid',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'path' => 
        array (
          'length' => '128',
          'collation' => 'A',
          'null' => false,
        ),
        'site_url' => 
        array (
          'length' => '128',
          'collation' => 'A',
          'null' => false,
        ),
        'uuid' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'date' => 
    array (
      'alias' => 'date',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'date' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'resource_id' => 
    array (
      'alias' => 'resource_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'resource_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => true,
        ),
      ),
    ),
    'ip' => 
    array (
      'alias' => 'ip',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'ip' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  "composites"  => array(
        "Items" => array(
            "class" => "modMonitorRequestItem",
            "cardinality"   => "many",
            "owner"         => "local",
            "local"         => "id",
            "foreign"       => "request_id",
        ),  
    ),
);
