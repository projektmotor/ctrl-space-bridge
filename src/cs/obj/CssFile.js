/* global Packages */

"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * Constructor for cs.obj.CssFile.
 * 
 * @param {object} raw - the java CSSFile instance
 * @returns {cs.obj.CssFile}
 */
cs.obj.CssFile = function (raw)
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }
};

/**
 * Get the file name of current CssFile instance.
 * 
 * @returns {string}
 */
cs.obj.CssFile.prototype.getFileName = function ()
{
    return this.raw.getFileName();
};

/**
 * Get the file path of current CssFile instance.
 * 
 * @returns {string}
 */
cs.obj.CssFile.prototype.getFilePath = function ()
{
    return this.raw.getFilePath();
};

/**
 * Get all child nodes (1st level).
 * 
 * @returns {Array}
 */
cs.obj.CssFile.prototype.getNodeTree = function ()
{
    var
        rootNode = this.raw.getNodeTree();

    return (rootNode)
        ? new cs.obj.CssNode(rootNode)
        : null;
};

/**
 * Returns the raw CSS document instance.
 * 
 * @returns {CSSFile}
 */
cs.obj.CssFile.prototype.getRaw = function ()
{
    return this.raw;
};

/**
 * Get selected nodes of current CSS document.
 * 
 * @returns {Array}
 */
cs.obj.CssFile.prototype.getSelectedNodes = function ()
{
    var
        rawSelections = window.getSelections(this.getFilePath()),
        selections = [];
    
    for (var i in rawSelections) {
        selections.push(
            new cs.obj.CssNode({raw: rawSelections[i]})
        );
    }
    
    return selections;
};

/**
 * Set the file path of current CssFile instance.
 * 
 * @param {string} filename
 * @returns {cs.obj.CssFile}
 */
cs.obj.CssFile.prototype.setFileName = function (filename)
{
    this.raw.setFileName(filename);
    
    return this;
};

/**
 * Get the file path of current CssFile instance.
 * 
 * @param {string} path - file path
 * @returns {cs.obj.CssFile}
 */
cs.obj.CssFile.prototype.setFilePath = function (path)
{
    this.raw.setFilePath(path);

    return this;
};

/**
 * Set the node tree of current CssFile instance.
 * 
 * @param {cs.obj.CssNode} node
 * @returns {cs.obj.CssFile}
 */
cs.obj.CssFile.prototype.setNodeTree = function (node)
{
    this.raw.setNodeTree(node.getRaw());
    
    return this;
};
