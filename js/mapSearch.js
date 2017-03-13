/**
 * Created by Scott E on 2/15/2017.
 */

var searchBar = $("#search");
var mementoStack = [];
var matches = [];

$(document).ready(function (){
    searchBar.on("keyup", function(e){
        if ($('#searchKeyword').is(':checked')){
            var searchResult = new RegExp(searchBar.val() + '.*', 'i');
            map.replaceBy(function (marker) {
                if (searchResult.test(marker.keywords) && marker.inCluster == false && marker.allowCategory == true) {
                    $("#" + marker.id).show();
                }
                return searchResult.test(marker.keywords)&& marker.inCluster == false && marker.allowCategory == true;
            });

            if (searchResult == "/.*/i" && mementoStack[0] == null ) {
                //do nothing
                //this keeps it from refreshing when backspace is hit before typing.
            }
            else {
                //check for backspace, empty mementoStack, and nonempty searchbar
                if (e.which == 8 && mementoStack[0] != null && searchResult != "/^.*/i") {
                    var previousState = mementoStack.pop()
                    for (var i = 0; i < previousState.length; i++) {
                        map.replaceBy(function (marker) {
                            return marker.id == previousState[i] && marker.inCluster == false && marker.allowCategory == true;
                        });
                        map.markers.items.forEach(function (marker) {
                            if(marker.id == previousState[i] && marker.allowCategory == true){
                                $("#" + previousState[i]).show();
                            }
                        });
                    }
                }
                //push to mementoStack when last key != backspace
                if (e.which != 8) {
                    mementoStack.push(matches);
                }
                matches = [];
                $.each(allKeywords, function (keyword) {
                    if (searchResult.test(allKeywords[keyword])) {
                        matches.push(keyword);
                    }
                });

                if (matches[0] == null) {
                    searchBar.fadeIn().html('').css("border", "3px solid red");
                    map.removeBy(function (marker) {
                        $("#"+marker.id).hide();
                        return marker;
                    })
                }
                else if (searchResult == "/^.*/i") {
                    mementoStack = [];
                    searchBar.fadeIn().html('').css("border", "0px solid red");
                    map.markers.items.forEach(function (marker) {
                        if(marker.inCluster == false && marker.allowCategory == true){
                            $("#" + marker.id).show();
                        }
                    });
                    map.replaceBy(function (marker) {
                        return marker.inCluster == false && marker.allowCategory == true;
                    })
                }
                else {
                    $.each(allKeywords, function (keyword) {
                        if (matches.includes(keyword)) {
                            //do nothing
                        }
                        else {
                            map.removeBy(function (marker) {
                                return marker.id == keyword;
                            });
                            $("#" + keyword).hide();
                        }
                    });

                    searchBar.fadeIn().html('').css("border", "0px solid red");
                }
            }
        }
        else {
            var searchResult = new RegExp('^' + searchBar.val() + '.*', 'i');

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
                            return marker.id == previousState[i] && marker.inCluster == false && marker.allowCategory == true;
                        });
                        map.markers.items.forEach(function (marker) {
                            if(marker.id == previousState[i] && marker.allowCategory == true){
                                $("#" + previousState[i]).show();
                            }
                        });
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
                    map.removeBy(function (marker) {
                        $("#"+marker.id).hide();
                        return marker;
                    })
                }
                else if (searchResult == "/^.*/i") {
                    mementoStack = [];
                    searchBar.fadeIn().html('').css("border", "0px solid red");
                    map.markers.items.forEach(function (marker) {
                        if(marker.inCluster == false && marker.allowCategory == true){
                            $("#" + marker.id).show();
                        }
                    });
                    map.replaceBy(function (marker) {
                        return marker.inCluster == false && marker.allowCategory == true;
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
        }


        bizList.scrollTop = 0;
    });

});