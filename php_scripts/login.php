<?php

require_once('./send_res.php');

$email = '1';
$password = '1';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['password'])) {
    http_response_code('400');
    send_res(array('message' => 'Fields can\'t be empty'));
} elseif($data['email'] !== $email || $data['password'] !== $password)  {
    http_response_code('401');
    send_res(array('message' => 'Incorrect credentials'));
} elseif ($data['email'] === $email && $data['password'] === $password) {
    $token = generateRandomString();
    setcookie('guesscountry', $token, time() + (60 * 60 * 24 * 365));
    saveToken($token);
    send_res(array('message' => 'Access is allowed'));
} else {
    http_response_code('500');
    send_res('Something went wrong');
}

function saveToken($token) {
    $data_file = file_get_contents('./session.json');
    $arr = json_decode($data_file, true);
    array_push($arr, $token);
    
    $fp = fopen('./session.json', 'w');
    fwrite($fp, json_encode($arr, true)); 
    fclose($fp); 
}

function generateRandomString($length = 60) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}