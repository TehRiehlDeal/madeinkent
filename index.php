<?php
    /**
     * Created by PhpStorm.
     * User: Kevin Riehl
     * Date: 2/2/2017
     * Time: 12:12 AM
     */

    // php header
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

?>



<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Made in Kent BETA</title>
        <link rel="icon" href="images/title-logo.png" type="image/png">

        <!-- Bootstrap -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">

        <!-- Adding jQuery for unslider to work -->
        <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>

        <!-- May use bootstrap js features later-->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <!-- font-awesome -->
        <script src="https://use.fontawesome.com/b74cf08957.js"></script>

        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="style/style.css" type="text/css">

        <link rel="stylesheet" href="js/unslider-master/dist/css/unslider.css">

    </head>

    <body>

        <?php include_once "includes/navbar.php" ?>

        <div class="content-wrapper">
            <div class="map-wrapper">
                <!-- Div to Display the map-->
                <div id="map"></div>
            </div>

            <div id="infoPanel">
                <div id="bizSearch" class="form-group">
                    <form class="form-inline">
                        <label for="search">Search:</label>
                        <input type="text" name="search" id="search" class="form-control">
                    </form>
                </div>

                <div id="bizList">
                </div>
            </div>
        </div>

        <div id="cue">
            <h2>Click a pin on the map!</h2>
            <p>See more info about a business by clicking its pin.</p>
        </div>

        <div id="legend">
            <!-- <h3>Legend </h3> -->
        </div>

        <div id="myModal" class="modal fade " role="dialog">
            <div class="modal-dialog text-center">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">Manufacturer Info</h4>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </body>

    <script src="js/markers.js"></script>

    <script src="js/initializeMap.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJVDb9uNj5U8pxTy-fwmFkcJe-JfiJDlU&callback=initMap" async defer></script>

</html>

