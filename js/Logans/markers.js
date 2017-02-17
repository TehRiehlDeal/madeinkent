/**
 * Created by Kevin Riehl on 2/2/2017.
 */

function addMarker(lat, lng){
    var thisMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lng)
    });
}