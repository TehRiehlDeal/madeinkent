/**
 * Created by Kevin Riehl on 2/2/2017.
 */

function cacheGeocode(address, location, token){
    console.log("Caching geocode for " + address + "...");
    //console.log(location);
    //console.log(location.lat());
    var xmlHttp = new XMLHttpRequest();
    var url = "scripts/cache.php";
    url += "?postcode=" + encodeURIComponent(address);
    url += "&latitude=" + location.lat();
    url += "&longitude=" + location.lng();
    url += "&token=" + token;

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}