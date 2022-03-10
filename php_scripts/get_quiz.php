<?php

require_once('./dbc.php');
require_once('./send_res.php');

$geography = mysqli_real_escape_string($dbc, trim($_GET['geography']));
$type = mysqli_real_escape_string($dbc, trim($_GET['type']));
$answer_count = mysqli_real_escape_string($dbc, trim($_GET['count']));

$arr_id = get_id($geography, $type, $dbc);
get_country($arr_id, (int) $answer_count, $dbc);

function get_country($arr_id, $answer_count, $dbc) {
    $rand = array_rand($arr_id, $answer_count);
    $cor = $arr_id[$rand[0]];

    for ($i = 1; $i < $answer_count; $i++) {
        $incor_data[] = createIncor($arr_id[$rand[$i]], $dbc);
    }

    //Correct answer
    $query = "SELECT c.country,c.capital,g.name,c.map,c.flag FROM guess_countries c
    JOIN guess_geography g ON c.geography_id = g.id
    WHERE c.id = $cor";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());

    while ($row = mysqli_fetch_array($result)) {
        $data[] = array(
            'country' => $row['country'],
            'capital' => $row['capital'],
            'geography' => $row['name'],
            'map' => $row['map'],
            'flag' => $row['flag'],
            'incorrect' => $incor_data
        );
    }

    send_res($data);
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