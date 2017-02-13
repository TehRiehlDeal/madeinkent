/**
 * Created by Joel on 2/6/2017.
 */
//creating categories for the icons
var categories = ['Food and Beverage', 'Paper and Wood',
    'Chemical and Plastics',
    'Construction and Metal Materials', 'Machinery',
    'Medical', 'Other Products', 'Other'];

//creating colors for different categories
var catColors = ['#0054A6','#FFF568','#FBAF5D','#545454','#F49AC2','#8C6239','#3CB878','#9E0B0F'];

// 7 defined categories ("other" is for undefined)
var codeCats = {
    //Food and Beverage
    '311': categories[0],
    '312': categories[0],

    //Paper and Wood
    '322': categories[1],

    //Chemical and Plastics
    '325': categories[2],
    '326': categories[2],

    //Construction and Metal Materials
    '327': categories[3],
    '331': categories[3],

    //Machinery
    '333': categories[4],
    '335': categories[4],
    '336': categories[4],

    //Medical
    '3391': categories[5],

    //Other Products
    '315': categories[6],
    '337': categories[6],

    // special case
    '3399': categories[6]
}

// Unicode values for respective fontawesome icons
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

//for each index in categories set the icons background image to the iconImage at that index
for (var cat in categories) {
    icons[categories[cat]] = iconImages[cat];
}

var icons2 =[];

//for each index in categories set the icons label to the markerLabel in that index
for (var cat in categories) {
    icons2[categories[cat]] = markerLabels[cat];
}

var mapCatColor = [];

for (var cat in categories) {
    mapCatColor[categories[cat]] = catColors[cat];
}

var legend = document.getElementById('legend');

var infoModal = document.getElementsByClassName('modal-body')[0];

//initiate variable for google's placesService
var placeService;

var map;

function initMap(window, google, MapLibrary) {
    var options = {
        center: new google.maps.LatLng(47.40924755801687, -122.24910480642092),
        zoom: 14,
        minZoom: 12,
        mapTypeID: google.maps.MapTypeId.HYBRID,
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
    var mapInstance = map.getMap();

    var legend = document.getElementById("legend");
    mapInstance.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    var cue = document.getElementById("cue");
    mapInstance.controls[google.maps.ControlPosition.LEFT_TOP].push(cue);

    //add placesService to access places library
    placeService = new google.maps.places.PlacesService(mapInstance);

}