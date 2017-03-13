/**
 * Created by Kevin Riehl on 2/2/2017.
 */
function geocodeFromGoogle(title, address, token, coSize, bizCode) {
    // TEST
    // cacheGeocode(title, address, {lat: 47.4276132, lng: -122.2513806}, token);
    geocoder.geocode({'address': address}, function(results, status){
        if (status === google.maps.GeocoderStatus.OK){
            cacheGeocode(address, results[0].geometry.location, token);
            addMarker(results[0].geometry.location.toJSON(), title, address, coSize, bizCode);
        } else {
            console.log('Geocode was not successul for the following reason: ' + status);
        }
    });
}