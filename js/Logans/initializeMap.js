/**
 * Created by Kevin Riehl on 2/2/2017.
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(47.40924755801687, -122.24910480642092),
        zoom: 14,
        minZoom: 12,
        mapTypeID: google.maps.MapTypeId.HYBRID
    });

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
        document.getElementById('legend'));

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(
        document.getElementById('cue'));

    addMarker(47.40924755801687, -122.24910480642092);
    addMarker(47.40934755801688, -122.24920480642092);
}
