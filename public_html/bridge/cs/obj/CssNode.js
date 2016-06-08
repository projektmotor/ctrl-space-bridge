/* global Packages, project */

"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * Constructor for cs.obj.CssNode
 * 
 * @param {object} raw - the java CssNode instance (for internal use)
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode = function (raw)
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }
};

/**
 * @type {integer} cs.obj.CssNode.TYPE_SELECTOR - node type selector
 */
cs.obj.CssNode.TYPE_SELECTOR = Packages.de.projektmotor.css3.chunks.CSSChunk.TYPE_CSS_SELECTOR;

/**
 * @type {integer} cs.obj.CssNode.TYPE_PROPERTY - node type property
 */
cs.obj.CssNode.TYPE_PROPERTY = Packages.de.projektmotor.css3.chunks.CSSChunk.TYPE_CSS_PROPERTY;



/**
 * Append child at the end of child list.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} childNode - node to add as new child
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.appendChild = function (childNode)
{
    this.raw.appendChild(childNode.getRaw());

    return this;
};


/**
 * Clone current CssNode instance.
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.clone = function()
{
    return new cs.obj.CssNode(this.raw.clone());
};

/**
 * Get first child node.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.firstChild = function ()
{
    return new cs.obj.CssNode(this.raw.firstChild());
};


/**
 * Get all child nodes of current cs.obj.CssNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {Array}
 */
cs.obj.CssNode.prototype.getChildren = function ()
{
    var
        rawChildren = this.raw.getChildNodes(),
        children = [];

    for (var i in rawChildren) {
        children.push(
            new cs.obj.CssNode(rawChildren[i])
        );
    }
    
    return children;
};

/**
 * Get child node at given position.
 * 
 * @treeTraversal
 * 
 * @param {integer} index - position index in list of child nodes
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.getChildAt = function (index)
{
    return new cs.obj.CssNode(
        this.raw.getChildAt(index)
    );
};

/**
 * Get number of child nodes.
 * 
 * @treeTraversal
 * 
 * @returns {integer}
 */
cs.obj.CssNode.prototype.getChildCount = function ()
{
    return this.raw.getChildNodesCount();
};

/*
 * Get the next sibling node.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.getNextSibling = function ()
{
    var
        rawNextSibling = this.raw.getNextSibling();

    return (rawNextSibling)
        ? new cs.obj.CssNode(rawNextSibling)
        : null;
};

/*
 * Get the pevious sibling node.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.getPreviousSibling = function ()
{
    var
        rawPreviousSibling = this.raw.getPreviousSibling();

    return (rawPreviousSibling)
        ? new cs.obj.CssNode(rawPreviousSibling)
        : null;
};

/**
 * Get the raw css node (for internal use).
 * 
 * @returns {Packages.de.projektmotor.css3.chunks.CSSNode}
 */
cs.obj.CssNode.prototype.getRaw = function ()
{
    return this.raw;
};

/**
 * Get the CssFile according to the node tree.
 * 
 * @returns {cs.obj.CssFile}
 */
cs.obj.CssNode.prototype.getRootCss = function ()
{
    return new cs.obj.CssFile(this.raw.getRoot());
};

/**
 * Get the node type.
 * 
 * @returns {integer}
 */
cs.obj.CssNode.prototype.getType = function ()
{
    return this.raw.getType();
};

/**
 * Get the node content.
 * 
 * @returns {integer}
 */
cs.obj.CssNode.prototype.getContent = function ()
{
    return this.raw.getContent();
};

/**
 * Set the node content.
 * 
 */
cs.obj.CssNode.prototype.setContent = function (content)
{
    return this.raw.setContent(content);
};

/**
 * Insert sibling before this node.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} siblingNode - node to add as new sibling
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.insertBefore = function (siblingNode)
{
    this.raw.insertBefore(siblingNode.getRaw());

    return this;
};

/**
 * Insert sibling behind this node.
 *
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} siblingNode - node to add as new sibling
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.insertBehind = function (siblingNode)
{
    this.raw.insertBehind(siblingNode.ferRaw());

    return this;
};

/**
 * Insert child at given index.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} childNode - childNode node to add as new child
 * @param {integer} index - position index in list of child nodes
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.insertChild = function (childNode, index)
{
     this.raw.insertChild(childNode.getRaw(), index);

     return this;
};

/**
 * Check if current cs.obj.CssNode instance is marked as root node.
 * 
 * @returns {bool}
 */
cs.obj.CssNode.prototype.isRoot = function ()
{
     return this.raw.isRoot();
};

/**
 * Check if current cs.obj.CssNode instance is marked as selected (e.g.
 * by image panel).
 * 
 * @returns {bool}
 */
cs.obj.CssNode.prototype.isSelected = function ()
{
     return this.raw.isSelected();
};

/**
 * Get last child.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.lastChild = function ()
{
    return new cs.obj.CssNode(this.raw.lastChild());
};

/**
 * Get next sibling node of current cs.obj.CssNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.nextSibling = function ()
{
    return new cs.obj.CssNode(this.raw.nextSibling());
};

/**
 * Prepend child at the beginning of child list.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} childNode - node to add as new child
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.prependChild = function (childNode)
{
    this.raw.prependChild(childNode.getRaw());

    return this;
};

/**
 * Get previous sibling node of current cs.obj.CssNode instance.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.previousSibling = function ()
{
    return new cs.obj.CssNode(this.raw.previousSibling());
};

/**
 * Get the parent node.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.CssNode|cs.obj.Css}
 */
cs.obj.CssNode.prototype.parent = function ()
{
    var
        rawParent = this.raw.parent();

    return (rawParent === null)
        ? null
        : new cs.obj.CssNode(rawParent);
};

/**
 * Remove current cs.obj.CssNode instance from node tree.
 * 
 * @treeTraversal
 * 
 * @treeTraversal
 */
cs.obj.CssNode.prototype.remove = function ()
{
    this.raw.remove();
};

/**
 * Remove given child node from tree of Css nodes.
 * 
 * @treeTraversal
 * 
 * @param {cs.obj.CssNode} childNode - child node to remove
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.removeChild = function (childNode)
{
    this.raw.removeChild(childNode.getRaw());

    return this;
};

/**
 * Remove child node at given position.
 * 
 * @treeTraversal
 * 
 * @param {integer} index - index of child node
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.removeChildAt = function (index)
{
    this.raw.removeChildAt(index);

    return this;
};

/**
 * Set current CssNode content.
 * 
 * @param {string} content - node content
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.setContent = function (content)
{
    this.raw.setContent(content);
    return this;
};

/**
 * Set the node type to [cs.obj.CssNode.TYPE_SELECTOR|cs.obj.CssNode.TYPE_PROPERTY].
 * 
 * @param {integer} type - node type
 * @returns {cs.obj.CssNode}
 */
cs.obj.CssNode.prototype.setType = function (type)
{
    this.raw.setType(type);
    return this;
};


