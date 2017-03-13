/**
 * Created by Joel on 2/8/2017.
 */
function placeDetails(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        //infoWindow.setContent();
        infoModal.innerHTML +=
            "<p id='socialMedia'>Social Media: <a href='https://www.facebook.com' target='_blank'><i class='fa fa-facebook-square' aria-hidden='true'></i></a>&nbsp;" +
            "<a href='https://www.twitter.com' target='_blank'><i class='fa fa-twitter-square' aria-hidden='true'></i>&nbsp;" +
            "<a href='https://www.linkedin.com' target='_blank'><i class='fa fa-linkedin-square' aria-hidden='true'></i>&nbsp;" +
            "<a href='https://www.instagram.com' target='_blank'><i class='fa fa-instagram' aria-hidden='true'></i></p>";

        if (typeof place.website != 'undefined') {
            infoModal.innerHTML +=
                "<fieldset class=\"form-group\">" +
                "<p><legend>Website:</legend>" +
                "<a href=\"" + place.website + "\" target=\"_blank\">" + place.website + "</a>"
                + "</p>" +
                "</fieldset>";
        }
    }
}

function placeID(results, status) {
    // parse response and update div
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //.icon is a thing... .name is place's name
        // also: .types type(s) of place it is
        // place_id is what we want.


        placeService.getDetails({placeId: results[0].place_id}, placeDetails);
    }
}
