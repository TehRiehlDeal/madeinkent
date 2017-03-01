/**
 * Created by Scott E on 2/15/2017.
 */

var searchBar = $("#search");
var mementoStack = [];
var matches = [];

$(document).ready(function (){
    searchBar.on("keyup", function(e){
        var searchResult = new RegExp('^' + searchBar.val() + '.*', 'i');
        console.log(searchResult);
        if (searchResult == "/^.*/i" && mementoStack[0] == null ) {
            //do nothing
            //this keeps it from refreshing when backspace is hit before typing.
        }
        else {
            //check for backspace, empty mementoStack, and nonempty searchbar
            if (e.which == 8 && mementoStack[0] != null && searchResult != "/^.*/i") {
                var previousState = mementoStack.pop()
                for (var i = 0; i < previousState.length; i++) {
                    map.replaceBy(function (marker) {
                        return marker.id == previousState[i] && marker.map == null;
                    });
                    $("#" + previousState[i]).show();
                }
            }
            //push to mementoStack when last key != backspace
            if (e.which != 8) {
                mementoStack.push(matches);
            }
            matches = [];
            $.each(allTitles, function (title) {
                if (searchResult.test(allTitles[title])) {
                    matches.push(title);
                }
            });

            if (matches[0] == null) {
                searchBar.fadeIn().html('').css("border", "3px solid red");
            }
            else if (searchResult == "/^.*/i") {
                mementoStack = [];
                searchBar.fadeIn().html('').css("border", "0px solid red");
                map.markers.items.forEach(function (marker) {
                    $("#" + marker.id).show();
                });
                map.replaceBy(function (marker) {
                    return marker.map == null
                })
            }
            else {
                $.each(allTitles, function (title) {
                    if (matches.includes(title)) {
                        //do nothing
                    }
                    else {
                        map.removeBy(function (marker) {
                            return marker.id == title;
                        });
                        $("#" + title).hide();
                    }
                });

                searchBar.fadeIn().html('').css("border", "0px solid red");
            }
        }

        bizList.scrollTop = 0;
    });
});