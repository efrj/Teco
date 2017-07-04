<?php

$app->get('/', function ($request, $response) {
    return $this->renderer->render($response, 'index.phtml');
});