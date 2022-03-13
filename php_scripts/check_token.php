<?php

function check_token() {
    if (isset($_COOKIE['guesscountry'])) {
        $res = file_get_contents('./session.json');
        $data_file = json_decode($res, true);
        if (in_array($_COOKIE['guesscountry'], $data_file)) return true;
        else return false;
    } else {
        return false;
    }
}