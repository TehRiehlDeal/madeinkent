/**
 * Created by Kevin Riehl on 2/2/2017.
 */

var infoModal = document.getElementsByClassName('modal-body')[0];
var placeService;
var geocoder;
var infoWindow;
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

var categories = ['Aerospace',
                'Food and Beverage',
                'Paper and Wood',
                'Chemical and Plastics',
                'Construction and Metal Materials',
                'Machinery',
                'Medical',
                'Other Products',
                'Other'];

var categoryColors = [
                    '#42B4E6',
                    '#0054A6',
                    '#FFF568',
                    '#FBAF5D',
                    '#545454',
                    '#F49AC2',
                    '#8C6239',
                    '#3CB878',
                    '#9E0B0F'];

var categoryCodes = {
        '311': categories[1],
        '312': categories[1],
        '322': categories[2],
        '325': categories[3],
        '326': categories[3],
        '327': categories[4],
        '331': categories[4],
        '333': categories[5],
        '335': categories[5],
        '336': categories[5],
        // special case
        '3391': categories[6],
        '315': categories[7],
        '337': categories[7],
        // special case
        '3399': categories[7],
        '336414': categories[0],
        '336413': categories[0]
    };

var markerLabels = ["\uf197",
            "\uf0f5",
            "\uf1bb",
            "\uf0c3",
            "\uf076",
            "\uf085",
            "\uf0fa",
            "\uf06b",
            "\uf275"];

var iconImageBase = 'images/icons/';

var iconImages = [
    iconImageBase + 'icon-1.png',
    iconImageBase + 'icon-2.png',
    iconImageBase + 'icon-3.png',
    iconImageBase + 'icon-4.png',
    iconImageBase + 'icon-5.png',
    iconImageBase + 'icon-6.png',
    iconImageBase + 'icon-7.png',
    iconImageBase + 'icon-8.png',
    iconImageBase + 'icon-9.png'];

var icons = [];

for (var category in categories) {
    icons[categories[category]] = iconImages[category];
}

var icons2 =[];

for (var category in categories) {
    icons2[categories[category]] = markerLabels[category];
}

var mapCategoryColor = [];

for (var category in categories) {
    mapCategoryColor[categories[category]] = categoryColors[category];
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