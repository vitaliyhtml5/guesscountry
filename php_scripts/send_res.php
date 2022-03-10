<?php

function send_res($data) {
    header('Content-type: application/json');
    print json_encode($data);
}