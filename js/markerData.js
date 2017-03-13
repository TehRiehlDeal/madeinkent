/**
 * Created by Joel on 2/8/2017.
 */
var postcodes;
var thisMarker;

$(document).ready(function(){
    //sets markers. Postcodes for geocoding can be accessed in postcodes markers array is in map.markers
    getMarkers(function(value) {
        //sets postcodes to the array of addresses and their lat/lng locations
        postcodes = value;
    });
    setLegend();
});

function getMarkers(callback) {
    $.ajax({
        url: 'markerQuery.php',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (results) {
            //set postcodes to array of postcodes

            var counter = 0;

            results.a.forEach(function(result){
                //set variables to values pulled from database
                address = result['ADDRESS LINE 1'] + ', ' + result['CITY, STATE & ZIPCODE'];
                title = result['BUSINESS NAME'];
                sic = result['SIC'];
                naics = result['NAICS'];
                nEmployees = result['FULL'] + result['PART'];
                id = counter;
                counter++;
                latitude = false;
                longitude = false;
                keywords = result['KEYWORDS'];

                var bizDiv = document.createElement("div");

                results.b.forEach(function(result) {
                    if (address == result['postcode']) {
                        latitude = result['latitude'];
                        longitude = result['longitude'];
                    }

                });

                //set options
                options = {
                    address: address,
                    id: id,
                    title: title,
                    inCluster: true,
                    allowCategory: true,
                    keywords: keywords
                };



                //if position is cached pull from cache otherwise dont set position and geocode
                if (latitude && longitude) {
                    options.lat = latitude;
                    options.lng = longitude;
                }

                //set companySize from total employees (nEmployees)
                if (nEmployees < 50){
                    options.coSize = "0 - 49";
                }
                else if (nEmployees < 100){
                    options.coSize = "50 - 99";
                }
                else if (nEmployees < 150){
                    options.coSize = "100 - 149";
                }
                else if (nEmployees < 200){
                    options.coSize = "150 - 199";
                }
                else if (nEmployees >= 200){
                    options.coSize = "200+";
                }

                options.coSize = options.coSize + " employees.";

                //set bizCode from SIC or NAICS code
                bizCode = sic.substring(0,2);
                naicsPrefix = naics.substring(0,2);
                if (naics != '' && (naicsPrefix == '31' || naicsPrefix == '32' || naicsPrefix == '33')){
                    bizCode = naics.substring(0,3);

                    // special cases
                    if (naics.substring(0,4) == '3391' || naics.substring(0,4) == '3399' )
                        bizCode = naics.substring(0,4);

                    if(naics.substring(0,6) == '336414' || naics.substring(0,6) == '336413')
                        bizCode = naics.substring(0,6);
                }
                options.bizCode = bizCode;

                //must use the cache since max requests per second is 50 and we have 119
                //create marker here
                thisMarker = map.addMarker(options);

                if (typeof categoryCodes[bizCode] != 'undefined'){
                    thisMarker.setLabel({
                        text: icons2[categoryCodes[bizCode]],
                        fontFamily: 'FontAwesome',
                        fontSize: '20px',
                    });
                    thisMarker.setIcon({labelOrigin: new google.maps.Point(23,17),
                        url: icons[categoryCodes[bizCode]]});

                }
                else {

                    thisMarker.setLabel({
                        text: icons2['Other'],
                        fontFamily: 'FontAwesome',
                        fontSize: '20px'
                    });
                    thisMarker.setIcon({labelOrigin: new google.maps.Point(23,17),
                        url: icons['Other']});
                }

                //set bizDiv id to same as marker id
                bizDiv.id = id;

                var faSymbol = icons2['Other'];
                if (typeof categoryCodes[bizCode] != 'undefined')
                    faSymbol = icons2[categoryCodes[bizCode]];

                bizDiv.innerHTML =
                    "<h4><span class='font-awesome'>" + faSymbol + "</span> " + title.toCamel() + "</h4>" +
                    "<p>" + address + "</p>" +
                    "<p>Company size: " + options.coSize + "</p>";
                bizList.appendChild(bizDiv);
                bizDivHeight = bizDiv.getBoundingClientRect().height + 10;
                allTitles.push(title);
                allKeywords.push(keywords);
            });

            $.each(map.markers.items, function (marker) {
                events = [{
                    name: 'click',
                    callback: function (e) {
                        openModal(marker)
                    }
                },{
                    name: 'mouseover',
                    callback: function (e) {
                        $("#" + marker).addClass("ipFocus")
                    }
                },{
                    name: 'mouseout',
                    callback: function(e) {
                        $("#" + marker).removeClass("ipFocus")
                    }
                }];
                map._attachEvents(map.markers.items[marker], events);
                $('#' + marker).mouseup(function(){
                    mapInstance.setCenter(map.markers.items[marker].position);
                    mapInstance.setZoom(16);
                });
                $('#' + marker).hover(function(){
                    $('#' + marker).css('cursor', 'pointer');
                    if (icons[categoryCodes[map.markers.items[marker].bizCode]] != undefined) {
                        map.markers.items[marker].setLabel({
                            text: icons2[categoryCodes[map.markers.items[marker].bizCode]],
                            fontFamily: 'FontAwesome',
                            fontSize: '40px'
                        });
                        map.markers.items[marker].setIcon({labelOrigin: new google.maps.Point(46, 34),
                            url: icons[categoryCodes[map.markers.items[marker].bizCode]],
                            scaledSize: new google.maps.Size(90, 100)
                        });
                    } else {
                        map.markers.items[marker].setLabel({
                            text: icons2['Other'],
                            fontFamily: 'FontAwesome',
                            fontSize: '40px'
                        });
                        map.markers.items[marker].setIcon({labelOrigin: new google.maps.Point(46, 34),
                            url: icons['Other'],
                            scaledSize: new google.maps.Size(90, 100)
                        });
                    }
                }, function(){
                    if (icons[categoryCodes[map.markers.items[marker].bizCode]] != undefined) {
                        map.markers.items[marker].setLabel({
                            text: icons2[categoryCodes[map.markers.items[marker].bizCode]],
                            fontFamily: 'FontAwesome',
                            fontSize: '20px'
                        });
                        map.markers.items[marker].setIcon({labelOrigin: new google.maps.Point(23,17),
                            url: icons[categoryCodes[map.markers.items[marker].bizCode]],
                            scaledSize: new google.maps.Size(45, 50)});
                    } else {
                        map.markers.items[marker].setLabel({
                            text: icons2['Other'],
                            fontFamily: 'FontAwesome',
                            fontSize: '20px'
                        });
                        map.markers.items[marker].setIcon({labelOrigin: new google.maps.Point(23,17),
                            url: icons['Other'],
                            scaledSize: new google.maps.Size(45, 50)});
                    }

                })

            });
            //save results.b to global variable
            callback(results.b);

        }
    });
}

function openModal(marker) {
    addClass(document.getElementById('cue'), 'hidden');

    //infoWindow.setContent("<h5>" + marker.getTitle() + "</h5><p>" + address + "</p>");

    infoModal.innerHTML =
        "<h2>" + map.markers.items[marker].title.toCamel() + "</h2>" +
        "<p>" + map.markers.items[marker].address +
        "</p>" +
        "<h4>Company size: " + map.markers.items[marker].coSize + "</h4>";

    $('#myModal').modal('show');

    // request place info
    var request = {
        location: {lat: parseFloat(map.markers.items[marker].lat), lng: parseFloat(map.markers.items[marker].lng)},
        radius: '1000',
        name: map.markers.items[marker].title
    };

    // placeInfo() handles response, callback to placeID() function
    placeService.nearbySearch(request, placeID);
}