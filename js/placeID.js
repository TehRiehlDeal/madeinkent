/**
 * Created by Kevin Riehl on 2/2/2017.
 */
function placeID(results, status) {
    // parse response and update div
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("Place search results: ");
        console.log(results);
        //.icon is a thing... .name is place's name
        // also: .types type(s) of place it is
        // place_id is what we want.

        //results[0].place_id;

        placeService.getDetails({placeId: results[0].place_id}, placeDetails);
    }
}