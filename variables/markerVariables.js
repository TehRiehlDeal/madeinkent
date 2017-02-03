/**
 * Created by Kevin Riehl on 2/2/2017.
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

var markers = [];

var categories = ['Food and Beverage',
                'Paper and Wood',
                'Chemical and Plastics',
                'Construction and Metal Materials',
                'Machinery',
                'Medical',
                'Other Products',
                'Other'];

var categoryColors = ['#0054A6',
                    '#FFF568',
                    '#FBAF5D',
                    '#545454',
                    '#F49AC2',
                    '#8C6239',
                    '#3CB878',
                    '#9E0B0F'];

var categoryCodes = {
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
    };

var markerLabels = ["\uf0f5",
            "\uf1bb",
            "\uf0c3",
            "\uf076",
            "\uf085",
            "\uf0fa",
            "\uf06b",
            "\uf275"];

var iconBase = 'images/icons/';

var iconImages = [
    iconImageBase + 'icon-2.png',
    iconImageBase + 'icon-3.png',
    iconImageBase + 'icon-4.png',
    iconImageBase + 'icon-5.png',
    iconImageBase + 'icon-6.png',
    iconImageBase + 'icon-7.png',
    iconImageBase + 'icon-8.png',
    iconImageBase + 'icon-9.png'];

var icons = [];

for (var cat in categories) {
    icons[categories[cat]] = iconImages[cat];
}

var icons2 =[];

for (var cat in categories) {
    icons2[categories[cat]] = markerLabels[cat];
}

var mapCategoryColor = [];

for (var cat in categories) {
    mapCategoryColor[categories[cat]] = categoryColors[cat];
}

var legend = document.getElementById('legend');

var legendIconColor = mapCategoryColor['Other'];

if (typeof categoryCodes[bizCode] != 'undefined')
    legendIconColor = mapCategoryColor[categoryCodes[bizCode]];

for (var label in markerLabels) {
    var name = categories[label];
    var icon = markerLabels[label];
    var div = document.createElement('div');
    div.innerHTML = '<p><span style="color:' + catColors[label] + '">' + icon + '</span> ' + name + '</p>';
    legend.appendChild(div);
}