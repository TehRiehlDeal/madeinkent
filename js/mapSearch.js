/**
 * Created by Scott E on 2/15/2017.
 */

var searchBar = $("#search");

$(document).ready(function (){
    searchBar.on("keyup", function(){
        var searchResult = new RegExp('^'+searchBar.val()+'.*', 'i');
        var matches = [];
        var markersToRemove = [];
        $.each(allTitles, function (title){
            if (searchResult.test(allTitles[title])){
                matches.push(title);
            }
        });

        if (matches[0] == null){
            searchBar.fadeIn().html('').css("border", "3px solid red");
        }
        else if (searchResult == "/^.*/i"){
            searchBar.fadeIn().html('').css("border","0px solid red");
            map.markers.items.forEach(function(marker){
                $("#"+marker.id).show();
            });
            map.replaceBy(function(marker){
                return marker.map == null
            })
        }
        else {
            $.each(allTitles, function(title ){
                if (matches.includes(title)){
                    //do nothing
                }
                else{
                    map.removeBy(function (marker){
                        return marker.id == title;
                    });
                    $("#" + title).hide();
                }
            });

            searchBar.fadeIn().html('').css("border", "0px solid red");
        }

        bizList.scrollTop = 0;
    });
});