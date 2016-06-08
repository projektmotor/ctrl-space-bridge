/* global io, project */

/* exported cs.panel.html */

var cs = cs || {};
cs.panel = cs.panel || {};
cs.panel.html = cs.panel.html || {};

/**
 * Get the currently active Html file object.
 * 
 * @returns {cs.obj.HtmlFile}
 */
cs.panel.html.getActiveHtml = function ()
{
    return new cs.obj.HtmlFile({raw : project.getActiveHtmlDocument()});
};