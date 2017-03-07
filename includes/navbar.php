<?php
/**
 * Created by PhpStorm.
 * User: Kevin Riehl
 * Date: 2/2/2017
 * Time: 12:14 AM
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
                <p>Kent Made, Washington Approved</p>
            </div>
        </div>
        <div id="navbar" class="navbar-collapse collapse ">
            <ul class="nav navbar-nav navbar-right navbar-collapse collapse pull-xs-right">
                <li id="index" class="active"><a href="index.php">Home</a></li>

                <li id="about"><a href="about.php">About</a></li>

                <li id="actBtn" class="navbar-btn">
                    <a href="http://www.kentwa.gov/home/showdocument?id=4655" target="_blank" class="btn btn-default ">Add your business!</a>
                </li>

                <li id="contactBtn" class="navbar-btn btn btn-default" data-toggle="modal" data-target="#contactModal">
                    Contact Us
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div><!-- Container-->
</nav>

<div id="contactModal" class="modal fade" role="dialog">
    <div class="modal-dialog text-center">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Contact Us</h4>
            </div>
            <div class="modal-body">
                <form id="contactUs" class="form-horizontal">
                    <div class="form-group">
                        <label for="inputName3" class="col-sm-2 control-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName3" placeholder="Name" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputMessage3" class="col-sm-2 control-label">Message</label>
                        <div class="col-sm-10">
                            <textarea type="text" class="form-control" id="inputMessage3" name="message"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

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
    $('#contactUs').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "contactUs.php",
            type: 'POST',
            data: $('#contactUs').serialize(),
            success: function (result) {
                if(result == 1){
                    $('#contactUs').trigger("reset");
                    $('#contactModal').modal('hide');
                }
            }
        });
    })
</script>
