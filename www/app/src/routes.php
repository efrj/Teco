<?php

$app->get('/', function ($request, $response) {
    return $this->renderer->render($response, 'index.phtml');
});

$app->post('/short-url', function ($request, $response) {
    $url = validate_url($request->getParam('url'));
    if ( $url == 'Not valid' ) {
        return $url;
    }

    $short_url = new \Teco\Model\Url;
    $short_url->original_url = $url;
    $short_url->short_url = generate_chars(6);

    if ( $short_url->save() ) {
        return $_SERVER['HTTP_HOST'] . '/' . $short_url->short_url;
    }
});

$app->get('/{url}', function ($request, $response) {
    $url = $request->getAttribute('url');
    $short_url = \Teco\Model\Url::where('short_url', $url)->first();
    $original_url = $short_url->original_url;
    header( "refresh:1;url=$original_url" );
});