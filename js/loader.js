/**
 * Created by Joel on 2/7/2017.
 */
(function() {
    //load google maps api
    google.load('maps', '3', { other_params :
        'libraries=places&key=AIzaSyDJVDb9uNj5U8pxTy-fwmFkcJe-JfiJDlU', callback : 'begin' })
})();

function begin() {
    library(window, google, List);
    initMap(window, google, MapLibrary);
}