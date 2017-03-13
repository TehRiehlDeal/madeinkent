/**
 * Created by Kevin Riehl on 2/2/2017.
 */

var infoModal = document.getElementsByClassName('mymodal-body')[0];
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
var bizCode;

var markers = [];

var categories = ['Aerospace and Outerspace',
                'Food and Beverage',
                'Chemical and Plastics',
                'Construction and Metal Materials',
                'Machinery',
                'Medical',
                'Other'];

var categoryColors = [
                    '#42B4E6',
                    '#0054A6',
                    '#FBAF5D',
                    '#545454',
                    '#F49AC2',
                    '#8C6239',
                    '#9E0B0F'];

var categoryCodes = {
        '311': categories[1],
        '312': categories[1],
        '325': categories[2],
        '326': categories[2],
        '327': categories[3],
        '331': categories[3],
        '333': categories[4],
        '335': categories[4],
        '336': categories[4],
        // special case
        '315': categories[5],
        '337': categories[5],
        // special case
        '3399': categories[5],
        '336414': categories[0],
        '336413': categories[0]
    };

var markerLabels = ["\uf197",
            "\uf0f5",
            "\uf0c3",
            "\uf076",
            "\uf085",
            "\uf0fa",
            "\uf275"];

var iconImageBase = 'images/icons/';

var iconImages = [
    iconImageBase + 'icon-1.png',
    iconImageBase + 'icon-2.png',
    iconImageBase + 'icon-4.png',
    iconImageBase + 'icon-5.png',
    iconImageBase + 'icon-6.png',
    iconImageBase + 'icon-7.png',
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