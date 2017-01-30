
<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<title>Made in Kent</title>
	<link rel="icon" href="images/title-logo.png" type="image/png">
	
	<!-- Bootstrap -->
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	
	<!-- Adding jQuery for unslider to work -->
	<script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
	
	<!-- May use bootstrap js features later-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVt8aXjF0XkGVkgeU0cyVAxkJT1EVulKc&libraries=places"></script>
	
	<script src="js/maplabel-compiled.js"></script>
	
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="style/style.css" type="text/css">
	
	<link rel="stylesheet" href="js/unslider-master/dist/css/unslider.css">
	    <style>
		#section {
		   width:100%;
		   
		   padding:10px;
		}	
	    </style>
		
	<link rel="icon" href="images/title-logo.png" type="image/png">
</head>

<body>
    
   
    <!--
    <div class="masthead">
        <img src="images/web-banner-start.png"/>

    </div>-->
        <!-- Display the banner for businesses-->
    
    <!-- Nav bar-->


	<?php include_once "includes/navbar.php" ?>



	<div class="container col-md-12">	
	    <div class="jumbotron">
		<h1 class="display-3">About Us</h1>
		<p class="lead">Made In Kent is an informational website meant to show off the manufacturers in the city of Kent, Washington.</p>
		<p>Each red pin displayed on the map corresponds to a manufacturer. The blue and yellow nodes represent clusters of pins in that area.</p>
		       <hr class="m-y-2">
		       <p>Clicking a pin shows more details about the manufacturer located there</p>
		       <p>When you click a red pin, you can see the following information shown in the info panel on the right:</p>
		<div class="row">
		    <div class="col-md-4">
			<ul class="">
			  <li class="list-group-item list-group-item-success">Business name</li>
			  <li class="list-group-item list-group-item-info">Address</li>
			  <li class="list-group-item list-group-item-warning">Company size (categorized into increments of 50 employees)</li>
			  <li class="list-group-item list-group-item-danger">Company website preview</li>
			</ul>
		    </div>
		</div>
	   </div>
	</div>
	
	
	<script src="js/markerclusterer_compiled.js"></script>
	
    <!-- for sliding through Place photos-->
    <script src="js/unslider-master/dist/js/unslider-min.js"></script> 
	<script>$(function() { $('.my-slider').unslider() })</script>

</body>
</html>