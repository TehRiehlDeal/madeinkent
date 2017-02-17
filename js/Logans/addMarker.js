/**
 * Created by Kevin Riehl on 2/2/2017.
 */

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