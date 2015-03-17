/* global Packages */

/* exported cs.obj.HtmlNode */

"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * Constructor for cs.obj.HtmlNode.
 * 
 * @param {object} raw - the java JSNode instance (for internal use)
 * @returns {cs.obj.cs.obj.HtmlNode}
 */
cs.obj.HtmlNode = function (raw)
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }
    
    return this;
};

/**
 * Appends childNode to list of children.
 * 
 * @param {cs.obj.HtmlNode} childNode - node to add as new child
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.appendChild = function (childNode)
{
    this.raw.appendChild(childNode.getRaw());

    return this;
};

/**
 * Clone current HtmlNode instance.
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.clone = function()
{
    return new cs.obj.HtmlNode(this.raw.clone());
};

/**
 * Get attribute given by key.
 * 
 * @treeTraversal
 * 
 * @param {string} key - name of attribute to set 
 * @returns {string}
 */
cs.obj.HtmlNode.prototype.getAttribute = function (key)
{
    return this.raw.getAttribute(key);
};

/**
 * Get child node at given position.
 * 
 * @treeTraversal
 * 
 * @param {integer} index - child node index
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getChildAt = function (index)
{
    var
        rawChildNode = this.raw.getChildAt(index);

    return (rawChildNode)
        ? new cs.obj.HtmlNode(rawChildNode)
        : null;
};

/**
 * Get number of child nodes.
 * 
 * @treeTraversal
 * 
 * @returns {integer}
 */
cs.obj.HtmlNode.prototype.getChildCount = function ()
{
    return this.raw.getChildCount();
};

/**
 * Get all children (1st level) of the current cs.obj.HtmlNode instance.
 * 
 * @returns {Array}
 */
cs.obj.HtmlNode.prototype.getChildNodes = function ()
{
    var
        rawChildren = this.raw.getChildNodes(),
        children = [];
    
    for (var i in rawChildren) {
        children.push(
            new cs.obj.HtmlNode(rawChildren[i])
        );
    }
    
    return children;
};

cs.obj.HtmlNode.prototype.getChildNodeCount = function ()
{
    return this.raw.getChildNodesCount();
};

/**
 * Get list of all child elements.
 * 
 * @returns {array}
 */
cs.obj.HtmlNode.prototype.getChildren = function ()
{
    return this.raw.getChildren();
};

/**
 * Get first child node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getFirstChild = function ()
{
    return new cs.obj.HtmlNode(
        this.raw.getFirstChild()
    );
};

/**
 * Get the cs.obj.HtmlFile instance according to node tree.
 * 
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.HtmlNode.prototype.getHtmlFile = function ()
{
    return new cs.obj.HtmlFile(this.raw.getRoot());
};

/**
 * Get last child node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getLastChild = function ()
{
    var
        lastChild = this.raw.getLastChild();
    
    return (lastChild)
        ? new cs.obj.HtmlNode(lastChild)
        : null;
};

/**
 * Get next sibling node of current cs.obj.HtmlNode instance.
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getNextSibling = function ()
{
    var
        nextSibling = this.raw.getNextSibling();
    
    return (nextSibling)
        ? new cs.obj.HtmlNode(nextSibling)
        : null;
};

/**
 * Retrieve the name of current node (div, span, html, ...)
 * 
 * @returns {string}
 */
cs.obj.HtmlNode.prototype.getNodeName = function ()
{
    return this.raw.getNodeName();
};

/**
 * Get parent element of current html element.
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getParent = function ()
{
    var
        parent = this.raw.getParentNode();

    return (parent)
        ? new cs.obj.HtmlNode(parent)
        : null;
};

/**
 * Get previous sibling node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.getPreviousSibling = function ()
{
    var
        previousSibling = this.raw.getPreviousSibling();
    
    return (previousSibling)
        ? new cs.obj.HtmlNode(previousSibling)
        : null;
};

/**
 * Get the raw html node (for internal use).
 * 
 * @returns {Packages.de.projektmotor.blueprint.api.JSDocument}
 */
cs.obj.HtmlNode.prototype.getRaw = function ()
{
    return this.raw;
};


/**
 * Get the text content between opening and closing tag.
 * 
 * @returns {string}
 */
cs.obj.HtmlNode.prototype.getTextContent = function ()
{
    return this.raw.getTextContent();
};

/**
 * Check if current cs.obj.HtmlNode instance is (one of) the root node(s).
 * 
 * @returns {bool}
 */
cs.obj.HtmlNode.prototype.isRoot = function ()
{
    return this.raw.isRoot();
};

/**
 * Check if current cs.obj.HtmlNode instance is marked as selected (e.g.
 * by image panel).
 * 
 * @returns {bool}
 */
cs.obj.HtmlNode.prototype.isSelected = function ()
{
    return this.raw.isSelected();
};

/**
 * mark node as selected (only visible in selections window if file is opened)
 * 
 * @returns {bool}
 */
cs.obj.HtmlNode.prototype.setSelected = function (selected)
{
    return this.raw.setSelected(selected);
};

/**
 * Insert node as sibling behind current node.
 * 
 * @param {cs.obj.HtmlNode} siblingNode - node to add as new sibling
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.insertBehind = function (siblingNode)
{ 
    this.raw.insertChildBehind(siblingNode.getRaw());

    return this;
};

/**
 * Insert node as sibling before current node.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.HtmlNode} siblingNode - node to add as new sibling
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.insertBefore = function (siblingNode)
{
    this.raw.insertChildBefore(siblingNode.getRaw());

    return this;
};

/**
 * Insert node as child at given position.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.HtmlNode} childNode - node to add as new child
 * @param {integer} index - index in list of children
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.insertChild = function (childNode, index)
{
    this.raw.insertChild(childNode.getRaw(), index);

    return this;
};

/**
 * Get last child node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.lastChild = function ()
{
    return new cs.obj.HtmlNode(
        this.raw.lastChild()
    );
};

/**
 * Get next sibling node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.nextSibling = function ()
{
    return new cs.obj.HtmlNode(
        this.raw.nextSibling()
    );
};


/**
 * Get parent node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.parent = function ()
{
    var
        rawParent = this.raw.parent();

    return (rawParent === null)
        ? null
        : new cs.obj.HtmlNode(rawParent);
};


/**
 * Prepend new child to current HtmlNode.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.HtmlNode} childNode
 * @returns {cs.obj.HtmlNode.prototype}
 */
cs.obj.HtmlNode.prototype.prependChild = function (childNode)
{
    this.raw.prependChild(childNode.getRaw());
    
    return this;
};

/**
 * Get previous sibling node of current cs.obj.HtmlNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.previousSibling = function ()
{
    return new cs.obj.HtmlNode(
        this.raw.previousSibling()
    );
};

/**
 * Remove current cs.obj.HtmlNode instance from cs.obj.HtmlFile node tree.
 * 
 * @treeTraversal
 */
cs.obj.HtmlNode.prototype.remove = function ()
{
    this.raw.remove();
};

/**
 * Remove attribute given by name.
 * 
 * @param {string} name - attribute to remove
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.removeAttribute = function (name)
{
    this.raw.removeAttribute(name);
    return this;
};

/**
 * Remove given child node from current cs.obj.HtmlNode.
 * 
 * @treeTraversal
 * 
 * @param {object} childNode - child cs.obj.HtmlNode to remove
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.removeChild = function (childNode)
{
    this.raw.removeChild(childNode.getRaw());

    return this;
};

/**
 * Remove given child node from current cs.obj.HtmlNode.
 * 
 * @treeTraversal
 * 
 * @param {integer} index - index of child cs.obj.HtmlNode to remove
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.removeChildAt = function (index)
{
    this.raw.removeChild(index);

    return this;
};

/**
 * Set attribute given by name to value.
 * 
 * @treeTraversal
 * 
 * @param {string} key - name of attribute to set 
 * @param {string} value - attribute value 
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.HtmlNode.prototype.setAttribute = function (key, value)
{
    this.raw.setAttribute(key, value);

    return this;
};

/**
 * Gives the text representation of the current cs.obj.HtmlNode instance
 * (same as rendered into file).
 * 
 * @returns {string}
 */
cs.obj.HtmlNode.prototype.toString = function ()
{
    return this.raw.toString();
};
