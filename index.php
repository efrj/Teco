<?php
require __DIR__ . '/app/vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
    'driver'   => 'sqlite',
    'database' => __DIR__.'/app/db/KJV-PCE.db',
    'prefix'   => '',
], 'default');
$capsule->bootEloquent();
$capsule->setAsGlobal();

session_start();

$settings = require __DIR__ . '/app/src/settings.php';
$app = new \Slim\App($settings);

require __DIR__ . '/app/src/dependencies.php';
require __DIR__ . '/app/src/routes.php';

$app->run();