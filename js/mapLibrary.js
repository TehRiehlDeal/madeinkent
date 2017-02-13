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
            if (options.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }
        }
        MapLibrary.prototype = {
            _on: function(options) {
                var self = this;
                google.maps.event.addListener(options.obj, options.event, function(e) {
                    options.callback.call(self, e, options.obj);
                });
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
            _createMarker: function(options) {
                options.map = this.map;
                return new google.maps.Marker(options);
            },
            _geocode: function(options) {
                this.geocoder.geocode({
                    address: options.address
                }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        options.success.call(this, results, status);
                        results[0].geometry.location.lat();
                        results[0].geometry.location.lng();
                    } else {
                        console.log("Geocoder Failed. Status: " + status);
                        options.error.call(this, status);
                    }
                });
            },
            addMarker: function(options) {
                var marker;
                var self = this;
                if (!options.lat) {
                    this._geocode({
                        address: options.address,
                        success: function (results) {
                            options.position = {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            };
                            console.log(options.position);
                            marker = self._createMarker(options);
                            if (this.markerClusterer) {
                                this.markerClusterer.addMarker(marker);
                            }

                            self.markers.add(marker);
                            if (options.events) {
                                self._attachEvents(marker, options.events);
                            }
                            return marker;
                        }
                    })
                } else {
                    options.position = new google.maps.LatLng(options.lat, options.lng);
                    marker = self._createMarker(options);
                    if (this.markerClusterer) {
                        this.markerClusterer.addMarker(marker);
                    }

                    self.markers.add(marker);
                    if (options.events) {
                        self._attachEvents(marker, options.events);
                    }
                    return marker;
                }
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
