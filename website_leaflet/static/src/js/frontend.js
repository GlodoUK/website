/* global Typed*/
odoo.define('website.leaflet', function (require) {
'use strict';

var dom = require('web.dom');
var publicWidget = require('web.public.widget');
var wUtils = require('website.utils');

publicWidget.registry.leafletMap = publicWidget.Widget.extend({
    selector: '.o_leaflet_map',

    start: function() {
        var def = this._super.apply(this, arguments);

        this.leafletInitDone = false;
        this.leafletTileTemplate = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
        this.fieldLat = this.$target[0].dataset.lat;
        this.fieldLong = this.$target[0].dataset.long;

        this.leafLetMarker = undefined;

        if (!this.fieldLat || !this.fieldLong) {
            console.error("No lat/long supplied for map");
            return;
        }

        this.initLeaflet();
    },

    initLeaflet: function() {
        if (this.leafletInitDone) {
            return;
        }

        var mapContainer = document.createElement("div");

        mapContainer.classList.add("o_leaflet_container", "col-md-12");
        this.el.appendChild(mapContainer);

        this.leafletMap = L.map(mapContainer, {
            maxBounds: [L.latLng(180, -180), L.latLng(-180, 180)],
        });

        L.tileLayer(this.leafletTileTemplate, {}).addTo(this.leafletMap);

        var self = this;

        $(mapContainer).resize(function () {
            // On resize we need to tell leaflet that the size has changed,
            // so that panTo, flyTo, etc. all work correctly.

            if (self.leafletMapResized) {
                clearTimeout(self.leafletMapResized);
            }

            self.leafletMapResized = setTimeout(function () {
                self.leafletMap.invalidateSize();
            }, 500);
        });

        this._addMarker();
    },

    _addMarker: function() {
        this.leafletMap.fitBounds([
            [this.fieldLat, this.fieldLong],
        ]);

        this.marker = L.marker([
            this.fieldLat,
            this.fieldLong,
        ]);

        var offset = new L.Point(0, 0);
        this.marker.addTo(this.leafletMap);
    },

    destroy: function () {
        if (this.marker) {
            this.marker.off("click");
        }
        if (this.leafletMapResized) {
            clearTimeout(this.leafletMapResized);
        }

        this.leafletMap.remove();
        return this._super.apply(this, arguments);
    },
});

});
