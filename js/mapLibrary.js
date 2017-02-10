/**
 * Created by Joel on 2/6/2017.
 */
function library(window, google, List) {
    var MapLibrary = (function() {
        function MapLibrary(element, options) {
            this.map = new google.maps.Map(element, options);
            this.markers = List.create();
            if (options.cluster) {
                this.markerClusterer = new MarkerClusterer(this.map, [], options.cluster.options);
            }
        }
        MapLibrary.prototype = {
            _on: function(options) {
                var self = this;
                google.maps.event.addListener(options.obj, options.event, function(e) {
                    options.callback.call(self, e, options.obj);
                });
            },
            addMarker: function(options) {
                var marker;
                var self = this;
                options.position = {
                    lat: options.lat,
                    lng: options.lng
                }
                marker = this._createMarker(options);
                if (this.markerClusterer) {
                    this.markerClusterer.addMarker(marker);
                }
                this.markers.add(marker);
                if (options.events) {
                    this._attachEvents(marker, options.events);
                }
                return marker;
            },
            _attachEvents: function(obj, events) {
                var self = this;
                events.forEach(function(event) {
                    self._on({
                        obj: obj,
                        event: event.name,
                        callback: event.callback
                    });
                });
            },
            //function to edit for search
            findBy: function(callback) {
                return this.markers.find(callback);
            },
            //function to edit for search
            removeBy: function(callback) {
                var self = this;
                self.markers.find(callback, function(markers) {
                    markers.forEach(function(marker) {
                        if (self.markerClusterer) {
                            self.markerClusterer.removeMarker(marker);
                        } else {
                            marker.setMap(null);
                        }
                    });
                });
            },
            _createMarker: function(options) {
                options.map = this.map;
                return new google.maps.Marker(options);
            },
            //gets an instance of the map
            getMap: function() {
                return this.map;
            }
        };
        return MapLibrary;
    })();

    MapLibrary.create = function(element, options) {
        return new MapLibrary(element, options);
    };

    window.MapLibrary = MapLibrary;
}
