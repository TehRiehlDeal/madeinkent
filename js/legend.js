/**
 * Created by Joel on 2/8/2017.
 */
function setLegend() {
    //Set the the legend to have each icon in its corresponding category color, and the name of the category
    for (var label in markerLabels) {
        var name = categories[label];
        var icon = markerLabels[label];
        var id = name.split(" ");
        var div = document.createElement('div');
        div.innerHTML = '<p><input type="checkbox" id="'+id[0]+'" checked="checked">' +
            '<span style="color:' + categoryColors[label] + '">' + icon + '</span>' +
            '<label for="'+id[0]+'">' + name + '</label></p>';
        legend.appendChild(div);
    }
    $('input:checkbox').change(function(){
       listenToLegend();
    });
}

function listenToLegend(){
    var aerospace = $("#Aerospace");
    var food = $("#Food");
    var chemical = $("#Chemical");
    var construction = $("#Construction");
    var machinery = $("#Machinery");
    var medical = $("#Medical");
    var other = $("#Other");



    if (aerospace.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[0] && marker.map == null;
        });       } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[0];
        });
    }


    if (food.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[1] && marker.map == null;
        });
    } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[1];
        });
    }

    if (chemical.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[2] && marker.map == null;
        });
    } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[2];
        });
    }

    if (construction.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[3] && marker.map == null;
        });
    } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[3];
        });
    }

    if (machinery.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[4] && marker.map == null;
        });
    } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[4];
        });
    }

    if (medical.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == categories[5] && marker.map == null;
        });
    } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == categories[5];
        });
    }

    if (other.is(':checked')){
        map.replaceBy(function(marker) {
            return categoryCodes[marker.bizCode] == undefined && marker.map == null;
        });       } else {
        map.removeBy(function(marker) {
            $("#"+marker.id).hide();
            return categoryCodes[marker.bizCode] == undefined;
        });
    }
}