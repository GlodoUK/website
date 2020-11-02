===============
website_leaflet
===============

Creates a leaflet.js powered frontend widget.

Currently only supports a single marker, no other functionality.

TODO
====

* Multiple markers
* Areas/polygons
* Snippet/editor support

Usage
=====

Add the following markup to your frontend

::

  <div class="o_leaflet_map" t-attf-data-lat="#{record.latitude}" t-attf-data-long="#{record.longitude}">
  </div>
