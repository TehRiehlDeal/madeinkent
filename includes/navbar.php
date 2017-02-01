<?php
/**
 * Created by PhpStorm.
 * User: Joel
 * Date: 1/25/2017
 * Time: 6:52 PM
 */
?>

<nav class="navbar navbar-default" id="nav_bar" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
                <img alt="Brand" src="images/kent-wa-logo.png">
            </a>
            <div class="navbar-intro">
                <h3>Welcome to MadeInKent BETA</h3>
                <p>See the interesting stuff made in the city of Kent, Washington</p>
            </div>
        </div>
        <div id="navbar" class="navbar-collapse collapse ">
            <ul class="nav navbar-nav navbar-right navbar-collapse collapse pull-xs-right">
                <li id="index"><a href="index.php">Home</a></li>

                <li id="about"><a href="about.php">About</a></li>

                <li id="actBtn" class="navbar-btn">
                    <a href="http://www.kentwa.gov/home/showdocument?id=4655" target="_blank" class="btn btn-default ">Add your business!</a>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div><!-- Container-->
</nav>

<script>
    $(document).ready(function()
    {
        var pathName = window.location.pathname;
        //console.log(pathName);

        var res = pathName.split("/");

        var lastPiece = res[res.length - 1];

       // console.log(lastPiece);

        if(lastPiece === "index.php")
        {
            $("#index").addClass("active");
            $("#about").removeClass("active");
        }
        else if(lastPiece === "about.php")
        {
            $("#about").addClass("active");
            $("#index").removeClass("active");
        }
    });
</script>