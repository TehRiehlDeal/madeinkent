/**
 * Created by Joel on 2/6/2017.
 */

/*
 * This file is in charge of creating and maintaining the map. It also
 * has access to the listLibrary to create and maintain the list of Markers.
 */

/*
 * This is a self invoking function that creates and returns a MapLibrary
 * object to manipulate the map with.
 */
function library(window, google, List) {
    var MapLibrary = (function() {
        /*
         * This method is a constructor for the MapLibrary object
         */
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
            /*
             * This is a private method used to add an event to an object.
             */
            _on: function(options) {
                var self = this;
                google.maps.event.addListener(options.obj, options.event, function(e) {
                    options.callback.call(self, e, options.obj);
                });
            },
            /*
             * This is a private method that takes an object and a list of events
             * and attaches each event using the _on method.
             */
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
            /*
             * This is a private method used to create a marker object
             */
            _createMarker: function(options) {
                options.map = this.map;
                return new google.maps.Marker(options);
            },
            /*
             * This is a private method that takes an address and returns
             * the lat/lng location
             */
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
            /*
             * This is a public metho that checks if there is a lat/lng position given. If not
             * it uses _geocode to get a lat/lng and then _createMarker to create the marker
             */
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
            /*
             * This method takes a callback which can be written to check any of
             * the marker attributes.
             * NOTE: PROBABLY NEEDS EDIT FOR FULL SEARCH FUNCTIONALITY
             */
            findBy: function(callback) {
                return this.markers.find(callback);
            },
            /*
             * This method takes a callback which can be written to check any of
             * the marker attributes, and then removes them from the map.
             * NOTE: DOES NOT REMOVE THEM FROM THE LIST. NEEDS EDIT FOR FULL SEARCH FUNCTIONALITY
             */
            removeBy: function(callback) {
                var self = this;
                self.markers.find(callback, function(markers) {
                    markers.forEach(function(marker) {
                        if (self.markerClusterer) {
                            self.markerClusterer.removeMarker(marker);
                            marker.inCluster = false;
                        } else {
                            marker.setMap(null);
                        }
                    });
                });
            },
            /*
             * This method is used to place markers back onto the map after they
             * have been removed.
             */
            replaceBy: function(callback) {
                var self = this;
                self.markers.find(callback, function(markers) {
                    markers.forEach(function(marker) {
                        if (self.markerClusterer) {
                            self.markerClusterer.addMarker(marker);
                            marker.inCluster = true;
                        } else {
                            marker.setMap(this.map);
                        }
                    });
                })
            },
            /*
             * This method retrieves a instance of the map itself.
             */
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
