<?php

$app->get('/', function ($request, $response) {
    return $this->renderer->render($response, 'index.phtml');
});

$app->post('/short-url', function ($request, $response) {
    $url = $request->getParam('url');
    $short = new \Teco\Model\Url;
    $short->original_url = $url;
    $short->short_url = short_url($url);
    if ( $short->save() )
    {
        echo 'http://teco.cf/' . $short->short_url;
    }
});

$app->get('/{url}', function ($request, $response) {
    $url = $request->getAttribute('url');
    $short = \Teco\Model\Url::where('short_url', $url)->first();
    return $response->withHeader('Location', $short->original_url);
});