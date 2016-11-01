<?php

require_once __DIR__ . '/modmonitorparser.class.php';

class modMonitorPdoParser extends pdoParser{
    use modMonitorParserTrait;
}
