/* global imagePanel, painter, Packages, project */

var cs = cs || {};
cs.panel.image = cs.panel.image || {};

/**
 * Clears all the painted stuff in image panel.
 */
cs.panel.image.clear = function ()
{
    painter.clear();
};

/**
 * Close SlimageViewer for SmallLayeredImage.
 * 
 * @param {cs.obj.SmallLayeredImage} smallLayeredImage
 */
cs.panel.image.close = function (smallLayeredImage) {
    cs.io.close(smallLayeredImage.getPath());
};

/**
 * Draw circle into active SlimageViewer.
 * 
 * @param {object} center - object with `x` & `y` property
 * @param {integer} radius - radius in px
 * @param {object|string} color - circle color
 */
cs.panel.image.drawCircle = function(center, radius, color)
{
    var shape;

    if (center === undefined || center.x === undefined || center.y === undefined) {
        cs.console.log('to paint a circle, at least center.x/center.y and radius has to be set');
        return;
    }
    
    shape = new Packages.de.projektmotor.slim.viewer.drawables.Circle(
        new Packages.java.awt.Point(center.x, center.y),
        radius,
        cs.obj.ColorFactory(color)
    );
    
    painter.draw(shape);
};

/**
 * Draw line into active SlimageViewer.
 *
 * @param {number} x1 - horizontal start
 * @param {number} y1 - horizontal end
 * @param {number} x2 - vertical start
 * @param {number} y2 - vertical end
 * @param {string} label - line label
 * @param {string} color - line color
 */
cs.panel.image.drawLine = function(x1, y1, x2, y2, label, color)
{
    var
        drawLineWithLabel,
        drawLineWithoutLabel,
        lineColor;

    drawLineWithLabel = function () {
        painter.draw(
            painter.createLabeledLine(
                x1,
                y1,
                x2,
                y2,
                lineColor,
                label
            )
        );
    };

    drawLineWithoutLabel = function () {
        painter.draw(
            painter.createLine(
                x1,
                y1,
                x2,
                y2,
                lineColor
            )
        );
    };

    lineColor = (color !== undefined)
        ? color
        : '#ff0000';

    (label !== undefined && (typeof label === 'string' || typeof label === 'number'))
        ? drawLineWithLabel()
        : drawLineWithoutLabel();
};

/**
 * Draw rectangle into active SlimageViewer.
 * 
 * @param {integer} x - horizontal offset
 * @param {integer} y - vertical offset
 * @param {integer} width - horizontal length
 * @param {integer} height - vertical length
 */
cs.panel.image.drawRectangle = function(x, y, width, height)
{
    painter.draw(
        new Packages.de.projektmotor.slim.viewer.drawables.Rectangle(
            x,
            y,
            width,
            height
        )
    );
};

/**
 * Draw text into active SlimageViewer.
 * 
 * @param {integer} x
 * @param {integer} y
 * @param {string} text
 * @param {object|string} color
 */
cs.panel.image.drawText = function(x, y, text, color)
{
    painter.draw(
        new Packages.de.projektmotor.slim.viewer.drawables.Text(
            text,
            new Packages.java.awt.Point(x, y),
            cs.obj.ColorFactory(color)
        )
    );
};

/**
 * get the currently active SmallLayeredImage
 * 
 * @returns {cs.obj.SmallLayereImage}
 */
cs.panel.image.getActiveSlimage = function () {    
    return new cs.obj.SmallLayeredImage(project.getActiveImage());
};

/**
 * opens a SmallLayeredImage in SlimageViewer
 * 
 * @param {cs.obj.SmallLayeredImage} smallLayeredImage
 */
cs.panel.image.open = function (smallLayeredImage) {
    cs.io.open(smallLayeredImage.getPath());
};


/**
 * set the currently active SmallLayeredImage
 * 
 * @param {cs.obj.SmallLayereImage} smallLayeredImage
 */
cs.panel.image.setActiveSlimage = function (smallLayeredImage) {
    cs.io.open(smallLayeredImage.getPath());
};