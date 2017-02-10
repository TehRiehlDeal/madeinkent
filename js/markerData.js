/**
 * Created by Joel on 2/8/2017.
 */
$(document).ready(function(){
    getMarkers();
    setLegend();
});

String.prototype.toCamel = function(){
    var re = /(\b[a-z](?!\s))/g;
    return this.toLowerCase().replace(re, function(x){
        return x.toUpperCase();
    });
};

function getMarkers() {
    $.ajax({
        url: 'markerQuery.php',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (results) {
            var counter = 0;
            results.forEach(function(result){
                //set variables to values pulled from database
                address = result['ADDRESS LINE 1'] + ', ' + result['CITY, STATE & ZIPCODE'];
                title = result['BUSINESS NAME'];
                companySize = "Unknown Number of";
                sic = result['SIC'];
                naics = result['NAICS'];
                nEmployees = result['FULL'] + result['PART'];
                id = counter;
                counter++;

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
                    if (naics.substring(0,4) == '3391' || naics.substring(0,4) == '3399')
                        bizCode = naics.substring(0,4);
                }

                // if (typeof codeCats[bizCode] != 'undefined'){
                //     marker.setLabel({
                //         text: icons2[codeCats[bizCode]],
                //         fontFamily: 'FontAwesome',
                //         fontSize: '20px'
                //     });
                //     marker.setIcon({labelOrigin: new google.maps.Point(23,17),
                //         url: icons[codeCats[bizCode]]});
                //     //console.log("marker.getLabel()" + marker.getLabel());
                // }
                // else {
                //     console.log("Marker for " + placeTitle + " undefined.");
                //     marker.setLabel({
                //         text: icons2['Other'],
                //         fontFamily: 'FontAwesome',
                //         fontSize: '20px'
                //     });
                //     marker.setIcon({labelOrigin: new google.maps.Point(23,17),
                //         url: icons['Other']});
                // }
                //
                // bizDiv.id = bizid;
                //
                // var faSymbol = icons2['Other'];
                // if (typeof codeCats[bizCode] != 'undefined')
                //     faSymbol = icons2[codeCats[bizCode]];
                // //console.log("infopanel icon should be defined");
                //
                // //console.log(faSymbol);
                // //console.log(bizCode);
                // //console.log(typeof codeCats[bizCode]);
                //
                // bizDiv.innerHTML =
                //     "<h4><span class='font-awesome'>" + faSymbol + "</span> " + placeTitle.toCamel() + "</h4>" +
                //     "<p>" + address + "</p>" +
                //     "<p>Company size: " + coSize + "</p>";
                // bizList.appendChild(bizDiv);
                // bizDivHeight = bizDiv.getBoundingClientRect().height + 10;

                console.log(address +" || "+ title +" || "+ companySize +" || "+ sic +" || "+ naics +" || "+ companySize +" || "+ bizCode +" || "+ id);
            });


            // map.addMarker({
            //     lat: 47.40924755801687,
            //     lng: -122.24910480642092,
            //     draggable: true,
            //     visible: true,
            //     id: 1,
            //     events: [{
            //         name: 'click',
            //         callback: function (e, marker) {
            //             alert("Marker Has Been Clicked");
            //             console.log(e, marker);
            //         }
            //     }, {
            //         name: 'dragend',
            //         callback: function (e) {
            //             alert("Marker Has Been Dragged");
            //         }
            //     }],
            //     icon: "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png"
            // });
        }
    });
}