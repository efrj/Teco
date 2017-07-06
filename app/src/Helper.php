<?php

function short_url( $url ) {
    $chars = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

    if(filter_var($url, FILTER_VALIDATE_URL) === FALSE)
    {
        return "Not valid";
    } else {
        return 'http://teco.cf/' . $chars[array_rand($chars)] . $chars[array_rand($chars)] . $chars[array_rand($chars)] . $chars[array_rand($chars)] . $chars[array_rand($chars)] . $chars[array_rand($chars)];
    }
}