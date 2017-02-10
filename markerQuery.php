<?php
/**
 * Created by PhpStorm.
 * User: Joel
 * Date: 2/8/2017
 * Time: 8:22 AM
 */
session_start();
require '/home/logan/creds/dblogin.php';

try {
    $dbh = new PDO("mysql:host=$hostname;
            dbname=logan_madeinkent", $username, $password);
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
echo json_encode($rows);
