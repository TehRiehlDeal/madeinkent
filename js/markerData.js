/**
 * Created by Joel on 2/8/2017.
 */
var postcodes;

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

            var counter = 1;

            results.a.forEach(function(result){
                //set variables to values pulled from database
                address = result['ADDRESS LINE 1'] + ', ' + result['CITY, STATE & ZIPCODE'];
                title = result['BUSINESS NAME'];
                companySize = "Unknown Number of";
                sic = result['SIC'];
                naics = result['NAICS'];
                nEmployees = result['FULL'] + result['PART'];
                id = counter;
                counter++;
                latitude = false;
                longitude = false;

                bizDiv = document.createElement("div");

                results.b.forEach(function(result) {
                    if (address == result['postcode']) {
                        latitude = result['latitude'];
                        longitude = result['longitude'];
                    }

                });

                //set options
                options = {
                    address: address,
                    id: id
                };

                //if position is cached pull from cache otherwise dont set position and geocode
                if (latitude && longitude) {
                    options.lat = latitude;
                    options.lng = longitude;
                }

                //must use the cache since max requests per second is 50 and we have 119
                //create marker here
                thisMarker = map.addMarker(options);

                //set companySize from total employees (nEmployees)
                if (nEmployees < 50){
                    companySize = "0 - 49";
                }
                else if (nEmployees < 100){
                    companySize = "50 - 99";
                }
                else if (nEmployees < 150){
                    companySize = "100 - 149";
                }
                else if (nEmployees < 200){
                    companySize = "150 - 199";
                }
                else if (nEmployees >= 200){
                    companySize = "200+";
                }

                companySize = companySize + " employees.";

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

                if (typeof categoryCodes[bizCode] != 'undefined'){
                    thisMarker.setLabel({
                        text: icons2[categoryCodes[bizCode]],
                        fontFamily: 'FontAwesome',
                        fontSize: '20px'
                    });
                    thisMarker.setIcon({labelOrigin: new google.maps.Point(23,17),
                        url: icons[categoryCodes[bizCode]]});
                    //console.log("thisMarker.getLabel()" + thisMarker.getLabel());
                }
                else {
                    //console.log("Marker for " + placeTitle + " undefined.");
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
                //console.log("infopanel icon should be defined");

                //console.log(faSymbol);
                //console.log(bizCode);
                //console.log(typeof categoryCodes[bizCode]);
                bizDiv.innerHTML =
                    "<h4><span class='font-awesome'>" + faSymbol + "</span> " + title.toCamel() + "</h4>" +
                    "<p>" + address + "</p>" +
                    "<p>Company size: " + companySize + "</p>";
                bizList.appendChild(bizDiv);
                bizDivHeight = bizDiv.getBoundingClientRect().height + 10;


            });
            //save results.b to global variable
            callback(results.b);

        }
    });
}

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
