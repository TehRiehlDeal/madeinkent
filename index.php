<?php
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
	
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5OUHz9sl_XvK32-ehqsYbV-dBFNj0OR8&libraries=places"></script>
	
	<script src="js/maplabel-compiled.js"></script>
	
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


<!-- Script to run the map. Markers should be the last thing to load on the page.--> 

	<script>
		String.prototype.toCamel = function(){
			var re = /(\b[a-z](?!\s))/g;
			return this.toLowerCase().replace(re, function(x){
				return x.toUpperCase();
			});
		};

		function addClass(el, className) {
		  if (el.classList)
			el.classList.add(className)
		  else if (!hasClass(el, className)) el.className += " " + className
		}
		
		function removeClass(el, className) {
		  if (el.classList)
			el.classList.remove(className)
		  else if (hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			el.className=el.className.replace(reg, ' ')
		  }
		}
		
		function toObject(arr) {
		  var rv = {};
		  for (var i = 0; i < arr.length; ++i)
			if (arr[i] !== undefined) 
				rv[i] = arr[i];
		  return rv;
		}
		
		var map;

		// for searching through business names
		var allTitles = [];

		var bizList = document.getElementById('bizList');
		var bizDivHeight;


		function initMap() {


			map = new google.maps.Map(document.getElementById('map'), {
				// centered on Kent valley 
				center: new google.maps.LatLng(47.40924755801687, -122.24910480642092),
				zoom: 14,
				minZoom: 12,
				mapTypeId: google.maps.MapTypeId.HYBRID
			});
			
			map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
				document.getElementById('legend'));
				
			map.controls[google.maps.ControlPosition.LEFT_TOP].push(
				document.getElementById('cue'));
			
			var mapLabel = new MapLabel({
				  text: 'Kent',
				  position: new google.maps.LatLng(47.40802772670872, -122.23185283803713),
				  map: map,
				  fontSize: 25,
				  align: 'right',
				});
				mapLabel.set('position', new google.maps.LatLng(47.40802772670872, -122.23185283803713));
			
			// uncomment to make label draggable and log dragend coords
			/*
			var zmarker = new google.maps.Marker();
			zmarker.bindTo('map', mapLabel);
			zmarker.bindTo('position', mapLabel);
			zmarker.setDraggable(true);
			zmarker.addListener('dragend',function(){
				console.log('LAT LNG: '); 
				console.log(zmarker.getPosition());
			});
			*/
		
			var infoModal = document.getElementsByClassName('modal-body')[0];
			var placeService = new google.maps.places.PlacesService(map);
			var geocoder = new google.maps.Geocoder();
			var infoWindow = new google.maps.InfoWindow({content:"Information"});
			var address = "";
			var title = "";
			//var nEmployees = 0;
			var companySize = "Unknown";
			var sic;
			var naics;
			var facebook;
			var twitter;
			var linkedIn;
			var instagram;
			
			// for clusterer
			var markers = [];
			
			var categories = ['Food and Beverage', 'Paper and Wood', 
				'Chemical and Plastics', 
				'Construction and Metal Materials', 'Machinery', 
				'Medical', 'Other Products', 'Other'];
				
			var catColors = ['#0054A6','#FFF568','#FBAF5D','#545454','#F49AC2','#8C6239','#3CB878','#9E0B0F'];
			
			// 7 defined categories ("other" is for undefined)
			var codeCats = {
				'311': categories[0],
				'312': categories[0],
				
				'322': categories[1],
				
				'325': categories[2],
				'326': categories[2],
				
				'327': categories[3],
				'331': categories[3],
				
				'333': categories[4],
				'335': categories[4],
				'336': categories[4],
				
				// special case
				'3391': categories[5],
				
				'315': categories[6],
				'337': categories[6],
				
				// special case
				'3399': categories[6]
			}
			
			// Unicode values for respective fontawesome icons
			//var markerLabels = ["\uf0f5","\uf1bb\uf0c5","\uf0c3\uf09d","\uf0f7\uf076","\uf085\uf1b6","\uf0fa\uf0f1","\uf06b\uf290","\uf275"];
			var markerLabels = ["\uf0f5","\uf1bb","\uf0c3","\uf076","\uf085","\uf0fa","\uf06b","\uf275"];
			
			var iconImageBase = 'images/icons/';
			var iconImages = [
							iconImageBase + 'icon-2.png', 
							iconImageBase + 'icon-3.png', 
							iconImageBase + 'icon-4.png',
							iconImageBase + 'icon-5.png',
							iconImageBase + 'icon-6.png',
							iconImageBase + 'icon-7.png',
							iconImageBase + 'icon-8.png',
							iconImageBase + 'icon-9.png'
							];
			
			var icons = [];
			
			for (var cat in categories) {
				icons[categories[cat]] = iconImages[cat];
			}
			
			var icons2 =[];
			
			for (var cat in categories) {
				icons2[categories[cat]] = markerLabels[cat];
			}
			
			var mapCatColor = [];
			
			for (var cat in categories) {
				mapCatColor[categories[cat]] = catColors[cat];
			}
			
			var legend = document.getElementById('legend');
			
			var legendIconColor = mapCatColor['Other'];
			if (typeof codeCats[bizCode] != 'undefined')
				legendIconColor = mapCatColor[codeCats[bizCode]];
			
			//console.log("LegendIconColor: ");
			//console.log(codeCats[bizCode]);
			
			for (var label in markerLabels) {
				var name = categories[label];
				var icon = markerLabels[label];
				var div = document.createElement('div');
				div.innerHTML = '<p><span style="color:' + catColors[label] + '">' + icon + '</span> ' + name + '</p>';
				legend.appendChild(div);
			}
			
			function placeDetails(place, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log("Place details results: ");
				console.log(place);
				console.log(place.photos); 
				
				//infoWindow.setContent();				    
				infoModal.innerHTML = 
					"<h2>" + place.name + "</h2>" + 
					"<p>" + place.formatted_address + "</p>" + 
					"<h4>Company size: " + companySize + "</h4>" +
					"<p id='socialMedia'>Social Media: <a href='https://www.facebook.com' target='_blank'><i class='fa fa-facebook-square' aria-hidden='true'></i></a>&nbsp;" +
                    "<a href='https://www.twitter.com' target='_blank'><i class='fa fa-twitter-square' aria-hidden='true'></i>&nbsp;" +
                    "<a href='https://www.linkedin.com' target='_blank'><i class='fa fa-linkedin-square' aria-hidden='true'></i>&nbsp;" +
                    "<a href='https://www.instagram.com' target='_blank'><i class='fa fa-instagram' aria-hidden='true'></i></p>" +
                    "<div class=\"form\">";
				
				
				
				if (typeof place.website != 'undefined') {					
					infoModal.innerHTML += 
					"<fieldset class=\"form-group\">" + 
						"<legend>Website: </legend>" + 
						"<p><a href=\"" + place.website + "\" target=\"_blank\">" + place.website + "</a>"
						+ "</p>" + 
						"<p><a target=\"_blank\" href=\"" + place.website + "\"><img " + 
							"alt=\"" + place.name + " - website thumbnail\" " + 
							"src=\"http://free.pagepeeker.com/v2/thumbs.php?size=l&url=" 
							+ place.website.replace(/^https?\:\/\//i, "") + "\"></a>" +
						"</p>" + 
					"</fieldset>";
				}
				
				 
				
				/* (images slider) */
				/*if (typeof place.photos != 'undefined') {
					infoModal.innerHTML += "<div class=\"my-slider form-group\"><ul id=\"slider\"></ul></div>";
					//var slider = document.getElementById('slider');
					//let photo;
					for (var photo in place.photos) {
						photoOpt = {'maxWidth': 400, 'maxHeight': 400};
						slider.innerHTML += "<li><img class=\"photo\" src=\"" + place.photos[0].getUrl(photoOpt) + "\"></li>";
					}
					$('.my-slider').unslider()
				}*/
				
				infoModal.innerHTML += "</div>";
			  }
			}
			
			function placeID(results, status) {
				// parse response and update div
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					console.log("Place search results: ");
					console.log(results); 
					//.icon is a thing... .name is place's name
					// also: .types type(s) of place it is
					// place_id is what we want.
					
					//results[0].place_id;
					
					placeService.getDetails({placeId: results[0].place_id}, placeDetails);
				}
			}
			
			function addMarker(point, placeTitle, address, coSize, bizCode) {
				var marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(point),
					title: placeTitle,
					draggable: false,
					icon: {labelOrigin: new google.maps.Point(23,17), 
							url: icons['Other']}
				});
				
				var bizid = 'bizid-' + markers.length;
				var bizDiv = document.createElement("div");
				
				var nDivs = markers.length;
				
				function openModal(){
					// WHAT DOES THIS LINE ACCOMPLISH?!?!?!?! (don't delete it)
					companySize = coSize;
					
					addClass(document.getElementById('cue'), 'hidden');

					//infoWindow.setContent("<h5>" + marker.getTitle() + "</h5><p>" + address + "</p>");
					//console.log(placeTitle.toCamel());
					infoModal.innerHTML =  
						"<h2>" + placeTitle.toCamel() + "</h2>" + 
						"<p>" + address + 
						"</p>" + 
						"<h4>Company size: " + coSize + "</h4>";

					$('#myModal').modal('show'); 
					
					//infoWindow.open(map, marker);
					
					// request place info
					var request = {
						location: point,
						radius: '1000',
						name: placeTitle
					};
					
					// placeInfo() handles response, callback to placeID() function
					placeService.nearbySearch(request, placeID);
				}
				
				//console.log("bizid: " + bizid);
				
				if (typeof codeCats[bizCode] != 'undefined'){
					marker.setLabel({
						text: icons2[codeCats[bizCode]],
						fontFamily: 'FontAwesome',
						fontSize: '20px'
					});
					marker.setIcon({labelOrigin: new google.maps.Point(23,17), 
							url: icons[codeCats[bizCode]]});
					//console.log("marker.getLabel()" + marker.getLabel());
				}
				else {
					console.log("Marker for " + placeTitle + " undefined.");
					marker.setLabel({
						text: icons2['Other'],
						fontFamily: 'FontAwesome',
						fontSize: '20px'
					});
					marker.setIcon({labelOrigin: new google.maps.Point(23,17), 
							url: icons['Other']});
				}
				
				//console.log("bizCode: " + bizCode);
				
				bizDiv.id = bizid;
				
				var faSymbol = icons2['Other'];
				if (typeof codeCats[bizCode] != 'undefined')
					faSymbol = icons2[codeCats[bizCode]];
					//console.log("infopanel icon should be defined");
				
				//console.log(faSymbol);
				//console.log(bizCode);
				//console.log(typeof codeCats[bizCode]);
				
				bizDiv.innerHTML = 
					"<h4><span class='font-awesome'>" + faSymbol + "</span> " + placeTitle.toCamel() + "</h4>" + 
					"<p>" + address + "</p>" + 
					"<p>Company size: " + coSize + "</p>";
				bizList.appendChild(bizDiv);
				bizDivHeight = bizDiv.getBoundingClientRect().height + 10;


				// Highlighting corresponding controls

				// this happens when the mouse moves over the bizlist
				bizList.addEventListener("mouseenter", function(){
					$("#cue").fadeOut(200);
					$("#legend").fadeOut(200);
				});

				bizList.addEventListener("mouseleave", function(){
					$("#cue").fadeIn(500);
					$("#legend").fadeIn(500);
				});
					
				// this happens whenever the mouse moves over a listing entry in the info panel
				bizDiv.addEventListener('mouseenter', function(){
					marker.setIcon({url: 'http://maps.google.com/mapfiles/kml/shapes/arrow.png'});
					//console.log("hovered on: " + this);
				});
				
				//console.log("bizDiv.attributes after adding event listener: ");
				//console.log(bizDiv.attributes);
				
				// This reverts what the mouseover did when the mouse exits the listing entry div
				bizDiv.addEventListener('mouseleave', function(){
					marker.setIcon({labelOrigin: new google.maps.Point(23,17), 
							url: icons['Other']});
					//console.log("mouseout: " + placeTitle);
				});
				
				marker.addListener('mouseover', function(){
					//console.log('nDivs: ' + nDivs + ' bizDiv height: ' + bizDiv.getBoundingClientRect().height)
					bizList.scrollTop = nDivs * (bizDiv.getBoundingClientRect().height + 10);
					addClass(bizDiv, 'ipFocus');
				});
				
				marker.addListener('mouseout', function(){
					removeClass(bizDiv, 'ipFocus');
				});
 
				// Triggering the Modal:
				
				bizDiv.addEventListener('click', openModal);
				
				// this happens whenever you click a marker.
				marker.addListener('click', openModal);
				
				markers.push(marker);
			}
			
			function cacheGeocode(address, location, token){
				console.log("Caching geocode for " + address + "...");
				//console.log(location);
				//console.log(location.lat());
				var xmlHttp = new XMLHttpRequest();
				var url = "scripts/cache.php";
				url += "?postcode=" + encodeURIComponent(address);
				url += "&latitude=" + location.lat();
				url += "&longitude=" + location.lng();
				url += "&token=" + token;
				 
				xmlHttp.onreadystatechange = function() { 
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
							console.log(xmlHttp.responseText);
				}
				xmlHttp.open("GET", url, true); // true for asynchronous 
				xmlHttp.send(null);
			}			
			
			function geocodeFromGoogle(title, address, token, coSize, bizCode) {	
				// TEST
				// cacheGeocode(title, address, {lat: 47.4276132, lng: -122.2513806}, token);
				geocoder.geocode({'address': address}, function(results, status){
					if (status === google.maps.GeocoderStatus.OK){
						//console.log(results[0].geometry.location.lat());
						cacheGeocode(address, results[0].geometry.location, token);
						addMarker(results[0].geometry.location.toJSON(), title, address, coSize, bizCode);
					} else {
						console.log('Geocode was not successul for the following reason: ' + status);
					}
				});
			}
		
		// takes business address and instantiates marker at the calculated coordinates.
		<?php 
			// FOR TESTING: LIMIT here will set the max number of rows to provide 
			$sql = "SELECT * FROM `kentbiz` WHERE (`NAICS` RLIKE '^3[1-3].*' OR `SIC` RLIKE '^[23].*') ORDER BY `BUSINESS NAME`";
			$result = $dbh->query($sql);

			foreach ($result as $row) { 
				unset($address);
				$address = $row['ADDRESS LINE 1'] . ', ' . $row['CITY, STATE & ZIPCODE'];
				$title = $row['BUSINESS NAME'];
				$companySize = "Unknown number of";
				$sic = $row['SIC'];
				$naics = $row['NAICS'];
				if (isset($row['FACEBOOK'])) {
					$facebook = $row['FACEBOOK'];
				}
				if (isset($row['TWITTER'])) {
					$twitter = $row['TWITTER'];
				}
				if (isset($row['LINKEDIN'])) {
					$linkedIn = $row['LINKEDIN'];
				}
				if (isset($row['INSTAGRAM'])) {
					$instagram = $row['INSTAGRAM'];
				}

				// No. of employees = No. of fulltime + No. of parttime.
				$nEmployees = intval($row['FULL']) + intval($row['PART']);
				
				if ($nEmployees < 50){
					$companySize = "0 - 49";
				}
				else if ($nEmployees < 100){
					$companySize = "50 - 99";
				}
				else if ($nEmployees < 150){
					$companySize = "100 - 149";
				}
				else if ($nEmployees < 200){
					$companySize = "150 - 199";
				}
				else if ($nEmployees >= 200){
					$companySize = "200+";
				}
				
				$companySize = $companySize . " employees.";
		?>
				address = <?php echo '"', $address, '"'; ?>;
				title = <?php echo '"', $title, '"'; ?>;
				companySize = <?php echo '"', $companySize, '"'; ?>;
				naics = <?php echo '"', $naics, '"'; ?>;
				sic = <?php echo '"', $sic, '"'; ?>;
				// only set the social media variables if they have values. Else set null
				facebook = <?php if (isset($facebook)){
					echo'"', $facebook, '"';
				} else {
					echo "null";
				}?>;
				twitter = <?php if (isset($twitter)){
					echo'"', $twitter, '"';
				} else {
					echo "null";
				}?>;
				linkedIn = <?php if (isset($linkedIn)){
				 	echo'"', $linkedIn, '"';
				} else {
					echo "null";
				}?>;
				instagram = <?php if (isset($instagram)){
					echo'"', $instagram, '"';
				} else {
					echo "null";
				}?>;

				allTitles.push(title);


				
				// console.log("sic: " + sic + " naics: " + naics);
				var bizCode = sic.substring(0,2);
				
				var naicsPrefix = naics.substring(0,2);
				if (naics != '' && (naicsPrefix == '31' || naicsPrefix == '32' || naicsPrefix == '33')){
					bizCode = naics.substring(0,3);
					
					// special cases
					if (naics.substring(0,4) == '3391' || naics.substring(0,4) == '3399')
						bizCode = naics.substring(0,4);
				}
				
		<?php
				include 'scripts/geocode.php';
				if (!empty($location)) {
					// cached geocode...
					echo 'console.log("Location From Cache: " + title);
					console.log(' . $location . ');
					addMarker(' . $location . ', title, address, companySize, bizCode);';
				}
				else {
					// need to cache the coordinates...
					
					echo 'console.log(title + " not found in cache...");';
					
					$token = bin2hex(openssl_random_pseudo_bytes(16));
					$_SESSION["$token"] = 1;
					
					?>
					geocodeFromGoogle(title, address, <?='"', $token,'"';?>, companySize, bizCode);
					<?php
				}
			 } 
		?>
			
			// UNCOMMENT to cluster the markers
			var markerCluster = new MarkerClusterer(map, markers,{minimumClusterSize: 5});
			
			//setGridSize(10);
			
			// Uncomment to aggregate and log stats about business codes
			/*
			for (var i in icons) {
				//console.log("ICON ELEMENT!");
				console.log("ICON ELEMENT:  " + icons[i].icon + " bizCode: " + i);
				var count = 0;
				for (var j = 0; j < markers.length; j++) {
					//console.log("marker: ");
					//console.log(markers[j].getIcon());
					if (markers[j].getIcon() == icons[i].icon) {
						count++;
					}
				}
				//console.log("AH AH AH!");
				console.log(count);
			}
			*/
			var searchBar = $("#search");
			searchBar.on("keyup", function() {
				var searchResult = new RegExp('^'+searchBar.val()+'.*', 'i');
				var matches = [];
				$.each(allTitles, function (title){
					if (searchResult.test(allTitles[title])) {
						matches.push(title);

					}
				});
				bizList.scrollTop = matches[0] * bizDivHeight;
				console.log(bizDivHeight);
			});
        }
		google.maps.event.addDomListener(window, 'load', initMap);
	</script>
	
	<script src="js/markerclusterer_compiled.js"></script>
	
    <!-- for sliding through Place photos-->
    <script src="js/unslider-master/dist/js/unslider-min.js"></script> 
	<script>$(function() { $('.my-slider').unslider() })</script>

</body>
</html>