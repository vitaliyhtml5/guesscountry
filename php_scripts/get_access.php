<?php

require_once('./send_res.php');
require_once('./check_token.php');

if (!check_token()) {
    http_response_code('401');
    send_res(array('message' => 'Unauthorized'));
} else {
    send_res(array('message' => 'Access is allowed'));
}