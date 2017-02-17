<?php
/**
 * Created by PhpStorm.
 * User: Joel
 * Date: 2/8/2017
 * Time: 8:22 AM
 */
session_start();
require '/home/madeinkent/creds/dblogin.php';

try {
    $dbh = new PDO("mysql:host=$hostname;
            dbname=madeinke_madeinkent", $username, $password);
    // echo "Connected to database.";
}
catch (PDOException $e) {
    echo $e->getMessage();
}


//error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// FOR TESTING: LIMIT here will set the max number of rows to provide
// Define the query
$query = "SELECT * FROM `kentbiz` WHERE (`NAICS` RLIKE '^3[1-3].*' OR `SIC` RLIKE '^[23].*') ORDER BY `BUSINESS NAME`";

//prepare the statement
$statement = $dbh->prepare($query);

//execute
$statement->execute();
$rows = $statement->fetchAll();

// FOR TESTING: LIMIT here will set the max number of rows to provide
// Define the query
$query2 = "SELECT * FROM `postcodes` ORDER BY `postcode`";

//prepare the statement
$statement2 = $dbh->prepare($query2);

//execute
$statement2->execute();
$rows2 = $statement2->fetchAll();

echo json_encode(array("a" => $rows, "b" => $rows2));
