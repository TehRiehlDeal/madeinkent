/**
 * Created by Kevin Riehl on 2/2/2017.
 */

function placeDetails(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("Place details results: ");
        console.log(place);
        console.log(place.photos);

        //infoWindow.setContent();
        infoModal.innerHTML =
            "<h2>" + place.name + "</h2>" +
            "<p>" + place.formatted_address + "</p>" +
            "<h4>Company size: " + companySize + "</h4>" +
            "<p id='socialMedia'>Social Media: <a href='https://www.facebook.com' target='_blank'><i class='fa fa-facebook-square' aria-hidden='true'></i></a>&nbsp;" +
            "<a href='https://www.twitter.com' target='_blank'><i class='fa fa-twitter-square' aria-hidden='true'></i>&nbsp;" +
            "<a href='https://www.linkedin.com' target='_blank'><i class='fa fa-linkedin-square' aria-hidden='true'></i>&nbsp;" +
            "<a href='https://www.instagram.com' target='_blank'><i class='fa fa-instagram' aria-hidden='true'></i></p>" +
            "<div class=\"form\">";

        if (typeof place.website != 'undefined') {
            infoModal.innerHTML +=
                "<fieldset class=\"form-group\">" +
                "<legend>Website: </legend>" +
                "<p><a href=\"" + place.website + "\" target=\"_blank\">" + place.website + "</a>"
                + "</p>" +
                "<p><a target=\"_blank\" href=\"" + place.website + "\"><img " +
                "alt=\"" + place.name + " - website thumbnail\" " +
                "src=\"http://free.pagepeeker.com/v2/thumbs.php?size=l&url="
                + place.website.replace(/^https?\:\/\//i, "") + "\"></a>" +
                "</p>" +
                "</fieldset>";
        }
        infoModal.innerHTML += "</div>";
    }

}