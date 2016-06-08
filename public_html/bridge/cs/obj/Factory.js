/* global fileManager */

"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};
cs.obj.factory = cs.obj.factory || {};

/**
 * Creates SmallLayeredImage. 
 * 
 * If no source is given, a empty SmallLayeredImage is created. If source is 
 * given, the SmallLayeredImage instance is loaded by its file representation.
 * 
 * @param {String} source - optional source parameter to load.
 * @returns {cs.obj.SmallLayeredImage}
 */
cs.obj.factory.createSmallLayeredImage = function (source)
{
    var
        rawInstance;
                
    rawInstance = (source !== undefined) 
        ? fileManager.createCSImageFrom(source)
        : fileManager.createCSImage();
    
    return new cs.obj.SmallLayeredImage(rawInstance);
};

/**
 * Creates empty SlimLayer.
 * 
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createSlimLayer = function ()
{
    return new cs.obj.SlimLayer(
        fileManager.createLayer()
    );
};

/**
 * Creates SlimLayer with a given (background) color.
 * 
 * @param {Object} color - layer color (@see cs.obj.ColorFactory)
 * @param {Integer} width - layer width
 * @param {Integer} height - layer height
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createSlimLayerByColor = function (color, width, height)
{
    return new cs.obj.SlimLayer(
        fileManager.createLayerByColor(
            cs.obj.FXColorFactory(color),
            width,
            height
        )
    );
};

/**
 * Creates SlimLayer from a simple image file (jpeg/gif/png).
 * 
 * @param {String} source - image file path
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createLayerFromFile = function (source)
{
    return new cs.obj.SlimLayer(
        fileManager.createLayerFromFile(source)
    );
};

/**
 * Creates SlimLayer from a Java BufferedImage instance.
 * 
 * @param {Packages.java.awt.image.BufferedImage} image - a java BufferedImage instance
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createLayerFromBufferedImage = function (image)
{
    return new cs.obj.SlimLayer(
        fileManager.createLayerFromImage(image)
    );
};

/**
 * Creates scaled SlimLayer from a simple image file (jpeg/gif/png).
 * 
 * @param {String} source - image file path
 * @param {Integer} width - layer width
 * @param {Integer} height - layer height
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createScaledLayerFrom = function (source, width, height)
{
    return new cs.obj.SlimLayer(
        fileManager.createScaledLayerFrom(source, width, height)
    );
};

/**
 * Creates scaled SlimLayer from a simple image file (jpeg/gif/png) and adds 
 * a JavaFX Effect on it.
 * 
 * @param {String} source - image file path
 * @param {Integer} width - layer width
 * @param {Integer} height - layer height
 * @param {javafx.scene.effect.Effect} effect - JavaFX Effect
 * @param {Integer} effectOffsetX - horizopntal JavaFX Effect offset
 * @param {Integer} effectOffsetY - vertical JavaFX Effect offset
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.factory.createScaledEffectLayerFrom = function (source, width, height, effect, effectOffsetX, effectOffsetY)
{
    return new cs.obj.SlimLayer(
        fileManager.createScaledEffectLayerFrom(source, width, height, effect, effectOffsetX, effectOffsetY)
    );
};

/**
 * Creates HtmlFile. 
 * 
 * If no source is given, a empty HtmlFile is created. If source is 
 * given, the HtmlFile instance is loaded by its file representation (parses
 * HTML file).
 * 
 * @param {String} source - optional source parameter to load.
 * @returns {cs.obj.HtmlFile}
 */
cs.obj.factory.createHtmlFile = function (source)
{
    var
        rawInstance;
                
    rawInstance = (source !== undefined) 
        ? fileManager.parseHTMLFile(source)
        : fileManager.createHTMLFile();
    
    return new cs.obj.HtmlFile(rawInstance);
};

/**
 * Creates HtmlNode. 
 * 
 * If no html code is given, a empty HtmlNode is created. If html code is 
 * given, the HtmlNode instance is created by parsing the given html code.
 * 
 * @param {String} htmlCode - optional html source code to parse
 * @returns {cs.obj.HtmlNode}
 */
cs.obj.factory.createHtmlNode = function (htmlCode)
{
    var
        rawInstance;
        
    rawInstance = (htmlCode !== undefined) 
        ? fileManager.parseHTML(htmlCode)
        : fileManager.createHTMLNode();
    
    return new cs.obj.HtmlNode(rawInstance);
};

/**
 * Creates CssFile. 
 * 
 * If no source is given, a empty CssFile is created. If source is 
 * given, the CssFile instance is loaded by its file representation (parses
 * CSS file).
 * 
 * @param {String} source - optional source parameter to load.
 * @returns {cs.obj.CssFile}
 */
cs.obj.factory.createCssFile = function (source)
{
    var
        rawInstance;
                
    rawInstance = (source !== undefined) 
        ? fileManager.parseCSSFile(source)
        : fileManager.createCSSFile();
    
    return new cs.obj.CssFile(rawInstance);
};

/**
 * Creates CssNode. 
 * 
 * If no css code is given, a empty CssNode is created. If css code is 
 * given, the CssNode instance is created by parsing the given css code.
 * 
 * @param {String} cssCode - optional css source code to parse
 * @returns {cs.obj.CssNode}
 */
cs.obj.factory.createCssNode = function (cssCode)
{
    var
        rawInstance;
        
    rawInstance = (cssCode !== undefined) 
        ? fileManager.parseCSS(cssCode)
        : fileManager.createCSSNode();
    
    return new cs.obj.CssNode(rawInstance);
};
