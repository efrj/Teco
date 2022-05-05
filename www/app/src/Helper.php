<?php

function generate_chars( $quantity_chars ) {
    $chars = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    $chars_increment = '';
    for ( $i=1; $i<=$quantity_chars; $i++ ) {
        $chars_increment .= $chars[array_rand($chars)];
    }
    return $chars_increment;
}

function validate_url( $url ) {
    $http = 'http';
    $find_http = strpos($url, $http);

    if ( $find_http === false ) {
        $url = 'http://' . $url;
    }

    if( filter_var($url, FILTER_VALIDATE_URL) === FALSE ) {
        return "Not valid";
    } else {
        return $url;
    }
}

function short_url( $url ) {
    return $short_url;
}