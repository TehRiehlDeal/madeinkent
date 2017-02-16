/**
 * Created by Joel on 2/8/2017.
 */
function setLegend() {
    //Set the the legend to have each icon in its corresponding category color, and the name of the category
    for (var label in markerLabels) {
        var name = categories[label];
        var icon = markerLabels[label];
        var div = document.createElement('div');
        div.innerHTML = '<p><span style="color:' + categoryColors[label] + '">' + icon + '</span> ' + name + '</p>';
        legend.appendChild(div);
    }
}