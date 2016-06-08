/* global Packages */

/* exported cs.obj.HtmlFile */

"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * Constructor for cs.obj.HtmlFile.
 * 
 * @param {object} raw - the java JSDocument instance (for internal use)
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.HtmlFile = function (raw)
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }
    
    return this;
};

/**
 * Get file name of HtmlFile.
 * 
 * @returns {string}
 */
cs.obj.HtmlFile.prototype.getFileName = function ()
{
    return this.raw.getFileName();
};

/**
 * Get file path of HtmlFile.
 * 
 * @returns {string}
 */
cs.obj.HtmlFile.prototype.getFilePath = function ()
{
    return this.raw.getFilePath();
};

/**
 * Get all nodes (first level) of HtmlFile.
 * 
 * @returns {Array}
 */
cs.obj.HtmlFile.prototype.getNodeTree = function ()
{
    var
        rawNode = this.raw.getNodeTree();

    return (rawNode)
        ? new cs.obj.HtmlNode(rawNode)
        : null;
};

/**
 * Returns the raw JSDocument instance.
 * 
 * @returns {JSDocument}
 */
cs.obj.HtmlFile.prototype.getRaw = function ()
{
    return this.raw;
};

/**
 * Get selected nodes of current Html document.
 * 
 * @returns {Array}
 */
cs.obj.HtmlFile.prototype.getSelectedNodes = function ()
{
    var
        rawSelections = window.getSelections(this.getFilename()),
        selections = [];
    
    for (var i in rawSelections) {
        selections.push(
            new cs.obj.HtmlNode({raw: rawSelections[i]})
        );
    }
    
    return selections;
};

/**
 * Set file name of current HtmlFile instance.
 * 
 * @param {string} filename
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.HtmlFile.prototype.setFileName = function (filename)
{
    this.raw.setFileName(filename);

    return this;
};

/**
 * Set file path of current HtmlFile instance.
 * 
 * @param {string} path - file path
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.HtmlFile.prototype.setFilePath = function (path)
{
    this.raw.setFilePath(path);
    
    return this;
};

/**
 * Set node tree of current HtmlFile instance.
 * 
 * @param {cs.obj.HtmlNode} node
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.HtmlFile.prototype.setNodeTree = function (node)
{
    this.raw.setNodeTree(node.getRaw());

    return this;
};
