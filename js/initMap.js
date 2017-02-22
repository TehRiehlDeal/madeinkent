function initMap(window, google, MapLibrary) {
    var options = {
        center: new google.maps.LatLng(47.40924755801687, -122.24910480642092),
        zoom: 14,
        minZoom: 12,
        mapTypeId: 'hybrid',
        cluster: {
            options: {
                minimumClusterSize: 4
            }
        },
        geocoder: true
    };
    var element = document.getElementById('map');

    map = MapLibrary.create(element, options);

    //getting an instance of the map to set mapInstance.controls
    mapInstance = map.getMap();

    var legend = document.getElementById("legend");
    mapInstance.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    var cue = document.getElementById("cue");
    mapInstance.controls[google.maps.ControlPosition.LEFT_TOP].push(cue);

    //add placesService to access places library
    placeService = new google.maps.places.PlacesService(mapInstance);

}