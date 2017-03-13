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

    listenToLegend();
}

function listenToLegend(){
    var aerospace = $("#Aerospace");
    var food = $("#Food");
    var chemical = $("#Chemical");
    var construction = $("#Construction");
    var machinery = $("#Machinery");
    var medical = $("#Medical");
    var other = $("#Other");



    aerospace.change(function() {
        if (aerospace.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[0] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[0] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[0]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[0];
            });
        }
    });


    food.change(function() {
        if (food.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[1] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[1] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[1]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[1];
            });
        }
    });

    chemical.change(function() {
        if (chemical.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[2] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[2] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[2]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[2];
            });
        }
    });

    construction.change(function() {
        if (construction.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[3] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[3] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[3]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[3];
            });
        }
    });

    machinery.change(function() {
        if (machinery.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[4] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[4] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[4]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[4];
            });
        }
    });

    medical.change(function() {
        if (medical.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[5] && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == categories[5] && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == categories[5]) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == categories[5];
            });
        }
    });

    other.change(function() {
        if (other.is(':checked')) {
            map.replaceBy(function (marker) {
                if (categoryCodes[marker.bizCode] == undefined && marker.inCluster == false) {
                    $("#" + marker.id).show();
                    marker.allowCategory = true;
                }
                return categoryCodes[marker.bizCode] == undefined && marker.inCluster == false;
            });
        } else {
            map.removeBy(function (marker) {
                if (categoryCodes[marker.bizCode] == undefined) {
                    $("#" + marker.id).hide();
                    marker.allowCategory = false;
                }
                return categoryCodes[marker.bizCode] == undefined;
            });
        }
    });
}