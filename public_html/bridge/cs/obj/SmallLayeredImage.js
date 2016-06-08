/* global Packages, window */
"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * cs.obj.SmallLayeredImage Constructor. 
 * 
 * @constructor
 *
 * @param {Object} raw - the java SmallLayersImage instance
 * @returns {cs.ob.SmallLayeredImage}
 */
cs.obj.SmallLayeredImage = function (raw) 
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }

    return this;
};

/**
 * Export SmallLayeredImage to common image (png/jpeg/...).
 *
 * @param {string} path - file path
 * @param {string} name - file name
 * @returns {cs.obj.SmallLayeredImage}
 */
cs.obj.SmallLayeredImage.prototype.export = function (path, name) {
    this
        .raw
        .mergeAll(
            this.raw.getLayers(),
            'tmpLayer'
        )
        .writeTo(
            path + name
        );

    return this;
};

/**
 * Get file name of SmallLayeredImage file.
 *
 * @returns {string}
 */
cs.obj.SmallLayeredImage.prototype.getFileName = function () {
    return this.raw.getFileName();
};

/**
 * Get file path of SmallLayeredImage file.
 *
 * @returns {string}
 */
cs.obj.SmallLayeredImage.prototype.getFilePath = function () {
    return this.raw.getFilePath();
};

/**
 * Get height of SmallLayeredImage in px.
 * 
 * @returns {integer}
 */
cs.obj.SmallLayeredImage.prototype.getHeight = function () {
    return this.raw.getHeight();
};

/**
 * Get all SlimLayer instances of current SmallLayeredImage.
 * 
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SmallLayeredImage.prototype.getLayers = function () {
    var
        rawLayers = this.raw.getLayers(),
        layers = [];

    for (var index in rawLayers) {
        layers.push(
            new cs.obj.SlimLayer(rawLayers[index])
        );
    }
    
    return layers;
};

/**
 * Get SlimLayer node tree of SmallLayeredImage.
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SmallLayeredImage.prototype.getNodeTree = function () {
    return new cs.obj.SlimLayer(this.raw.getNodeTree());
};

/**
 * Get the raw SmallLAyeredImage instance (Ctrl-Space internally used).
 * 
 * @returns {SmallLayersImage}
 */
cs.obj.SmallLayeredImage.prototype.getRaw = function ()
{
    return this.raw;
};

/**
 * Get the currently selected SlimLayer instances as array.
 * 
 * @returns {array}
 */
cs.obj.SmallLayeredImage.prototype.getSelectedLayers = function () {
    var
        layers = [],
        rawLayers;

    rawLayers = window.getSelections(
        this.getFilePath()
    );
    
    for (var x in rawLayers) {
        layers.push(
            new cs.obj.SlimLayer(rawLayers[x])
        );
    }
    
    return layers;
};

/**
 * Get width of SmallLayeredImage in px. 
 * 
 * @returns {integer}
 */
cs.obj.SmallLayeredImage.prototype.getWidth = function () {
    return this.raw.getWidth();
};

/**
 * Merge all layers in layer tree into new one.
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SmallLayeredImage.prototype.mergeAll = function () {
    var
        tmpBaseLayer;

    tmpBaseLayer = this.raw.mergeAll(
         this.raw.getLayers(),
        'tmpLayer'
    );

    return new cs.obj.SlimLayer(tmpBaseLayer);
};

/**
 * Set height of SmallLayeredImage in px.
 * 
 * @param {integer} height
 * @returns {integer}
 */
cs.obj.SmallLayeredImage.prototype.setHeight = function (height) {
    this.raw.setHeight(height);
};

/**
 * Set path of SmallLayeredImage file.
 *
 * @param {string} filename - file path
 * @returns {cs.obj.SmallLayeredImage}
 */
cs.obj.SmallLayeredImage.prototype.setFileName = function (filename) {
    this.raw.setFileName(filename);

    return this;
};

/**
 * Set file path of SmallLayeredImage file.
 *
 * @param {string} path - a absolute file path
 * @returns {cs.obj.SmallLayeredImage}
 */
cs.obj.SmallLayeredImage.prototype.setFilePath = function (path) {
    this.raw.setFilePath(path);
    
    return this;
};

/**
 * Set a new SlimLayer as root node of node tree.
 *
 * @param {cs.ob.SlimLayer} slimLayer
 * @returns {cs.obj.SmallLayeredImage}
 */
cs.obj.SmallLayeredImage.prototype.setNodeTree = function (slimLayer) {
    this.raw.setNodeTree(slimLayer.getRaw());

    return this;
};

/**
 * Set width of SmallLayeredImage in px.
 * 
 * @param {integer} width
 * @returns {integer}
 */
cs.obj.SmallLayeredImage.prototype.setWidth = function (width) {
    this.raw.setWidth(width);
};