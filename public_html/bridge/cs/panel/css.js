/* global io, project */

/* exported cs.panel.css */

var cs = cs || {};
cs.panel = cs.panel || {};
cs.panel.css = cs.panel.css || {};

/**
 * Get the currently active Css file object.
 * 
 * @returns {cs.obj.CssFile}
 */
cs.panel.css.getActiveCss = function ()
{
    return new cs.obj.CssFile({raw : project.getActiveCSSDocument()});
};

/**
 * Open existing CSS file in editor.
 * 
 * @param {String} path - file path
 * @returns {cs.panel.css}
 */
cs.panel.css.open = function (path) {
    if (!io.fileExists(path)) {
        throw new Error('file does not exist: ' + path);
    }

    io.open(path);
};
