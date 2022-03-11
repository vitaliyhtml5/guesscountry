<?php

require_once('./dbc.php');
require_once('./send_res.php');

$geography = mysqli_real_escape_string($dbc, trim($_GET['geography']));
$type = mysqli_real_escape_string($dbc, trim($_GET['type']));
$answer_count = mysqli_real_escape_string($dbc, trim($_GET['count']));

$arr_id = get_id($geography, $type, $dbc);
$data = [];
$correct_id = [];
$incorrect_answ = [];

$i = 0;
while ($i < 10) {    
    if (get_answers($arr_id, $answer_count, $dbc)) {
        $data[] = get_country($correct_id[$i], $incorrect_answ, $dbc);
        $i++;
    }
    else continue;
}
send_res($data);

//Get correct and incorrect id 
function get_answers($arr_id, $answer_count, $dbc) {
    global $correct_id;
    global $incorrect_answ;
    $rand = array_rand($arr_id, $answer_count);
    
    if (in_array($arr_id[$rand[0]], $correct_id)) return false;
    else {
        $correct_id[] = $arr_id[$rand[0]];
        $incorrect_answ = [];
        for ($i = 1; $i < $answer_count; $i++) {
            $incorrect_answ[] = createIncor($arr_id[$rand[$i]], $dbc);
        }
        return true;
    }
}

//Correct answer
function get_country($correct_id, $incorrect_answ, $dbc) {     
    $query = "SELECT c.country,c.capital,g.name,c.map,c.flag FROM guess_countries c
    JOIN guess_geography g ON c.geography_id = g.id
    WHERE c.id = $correct_id";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    while ($row = mysqli_fetch_array($result)) {
        $data = array(
            'country' => $row['country'],
            'capital' => $row['capital'],
            'geography' => $row['name'],
            'map' => $row['map'],
            'flag' => $row['flag'],
            'incorrect' => $incorrect_answ
        );
    }
    return $data;
}

//Incorrect answer
function createIncor($id, $dbc) {
    $query = "SELECT country FROM guess_countries WHERE id IN ($id)";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    return mysqli_fetch_array($result)['country'];
}

//Get all id of countries
function get_id($geography, $type, $dbc) {
    if ($geography === 'all') {
        $query = "SELECT id FROM guess_countries WHERE $type IS NOT NULL";
    } else {
        $query = "SELECT c.id FROM guess_countries c
        JOIN guess_geography g ON c.geography_id = g.id
        WHERE g.name = '$geography' AND $type IS NOT NULL";
    }
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    while ($row = mysqli_fetch_array($result)) {
        $arr[] = $row['id'];
    }
    return $arr;
}

mysqli_close($dbc);