/**
 * Created by Joel on 2/7/2017.
 */

/*
 * This file is in charge of creating and maintaining the list.
 */

/*
 * This is a self invoking function that creates a List object and returns it
 */
(function(window) {
    var List = (function() {
        /*
         * This method is the constructor for the List object
         */
        function List(params) {
            this.items=[];
        }
        List.prototype = {
            /*
             * This method lets you push new items to the list.
             */
            add: function(item) {
                this.items.push(item);
            },
            /*
             * This method lets you splice an item from the list.
             */
            remove: function(item) {
                var indexOf = this.items.indexOf(item);
                if(indexOf !== -1) {
                    this.items.splice(indexOf, 1);
                }
            },
            /*
             * This method takes a callback and an optional action. The callback
             * takes all matching items from the list and pushes them to matches array,
             * then if no action param exists, matches array is returned, if action
             * does exist it is executed with the matches array and matches is returned.
             */
            find: function(callback, action) {
                var callbackReturn,
                    items = this.items,
                    length = items.length,
                    matches = [],
                    i = 0;
                for(;i < length; i++) {
                    callbackReturn = callback(items[i], i);
                    if (callbackReturn) {
                        matches.push(items[i]);
                    }
                }
                if (action) {
                    action.call(this, matches);
                }
                return matches;
            }
        };
        return List;
    }());

    List.create = function(params) {
        return new List(params)
    }

    window.List = List;

}(window));