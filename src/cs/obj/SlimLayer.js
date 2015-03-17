/* global Packages */
"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * cs.obj.SlimLayer Constructor.
 *
 * @constructor
 *
 * @param {Object} raw - the java SlimLayer instance
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer = function(raw) 
{
    if (raw !== undefined) {
        this.raw = raw;
    } else {
        throw new Error('no raw property set. please use cs.obj.factory to creates object instances!');
    }

    return this;
};

/**
 * Append new child to current SlimLayer.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new child
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.appendChild = function (slimLayer)
{
    this.raw.appendChild(slimLayer.getRaw());

    return this;
};

/**
 * Get array of child nodes (1st level).
 * 
 * @treeTraversal
 * 
 * @returns {Array}
 */
cs.obj.SlimLayer.prototype.childNodes = function () 
{
    var
        rawNodes = this.raw.childNodes(),
        nodes = [];

    for (var index in rawNodes) {
        nodes.push(
            new cs.obj.SlimLayer(rawNodes[index])
        );
    }

    return nodes;
};

/**
 * Check if given coordinates are inside layer bounds.
 *
 * @todo: test this stuff
 *
 * @param {integer} x - vertical direction
 * @param {integer} y - horizontal direction
 * @returns {bool}
 */
cs.obj.SlimLayer.prototype.contains = function (x, y) {
    return this.raw.contains(
        new Packages.java.awt.Point(x, y)
    );
};

/**
 * Copy the current SlimLayer instance.
 *
 * @todo: test this stuff
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.copy = function () {
    var
        rawLayer = this.raw.copy();

    return new cs.obj.SlimLayer({
        layer: rawLayer
    });
};

/**
 * Draw rectangle with Java AWT in layer.
 *
 * @todo: transfer to java
 *
 * @param {integer} offsetX - vertical offset
 * @param {integer} offsetY - horizontal offset
 * @param {integer} width - vertical size
 * @param {integer} height - horizontal size
 * @param {object} color - background color
 * @param {double} rotation - rotation angle
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.drawRectangle = function (offsetX, offsetY, width, height, color, rotation)
{
    if(this.raw.image === undefined){
        throw new Exception("Layer not properly initialized. Missing internal image object. please use constructor SlimLayer(w, h, color) instead.");
    }

    g2d = this.raw.image.createGraphics();
    g2d.setPaint(cs.obj.ColorFactory(color));

    g2d.rotate(Packages.java.lang.Math.toRadians(rotation));
    g2d.fillRect(offsetX, offsetY, width, height);

    g2d.dispose();
    
    return this;
};

/**
 * Draw rectangle with JavaFX in layer.
 *
 * params.width ......................... horizontal rectangle dimension
 * params.height ........................ vertical rectangle dimension
 * params.offsetX ....................... horizontal offset in layer
 * params.offsetY ....................... vertical offset in layer
 * params.color ......................... rectangle fill color
 * params.rotation ...................... rotation angle
 * params.shadow.size ................... shadow size
 * params.shadow.color .................. shadow color (rgba|hex)
 * params.shadow.offsetX ................ horizontal shadow offset
 * params.shadow.offsetY ................ vertical shadow offset
 * params.border.size ................... size of border stroke
 * params.border.color .................. color of border stroke
 * params.border.position ............... position of border stroke (inside|centered|outside)
 *
 * @param {object} params
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.drawRectangleFX = function (params) {
    var
        _addShadow,
        _buildProperties,
        _buildRectangle,
        _finalize,
        fxRectangle,
        properties,
        that = this;

    if (params === undefined || params.width === undefined || params.height === undefined) {
        cs.console.log('rectangle creation failed! you have to set ractangle width & height');
        return;
    }

    _addShadow = function () {
        var
            dropShadow;

        dropShadow = new Packages.javafx.scene.effect.DropShadow();

        dropShadow.setRadius(properties.shadow.size);
        dropShadow.setOffsetX(properties.shadow.offsetX);
        dropShadow.setOffsetY(properties.shadow.offsetX);
        dropShadow.setColor(cs.obj.FXColorFactory(properties.shadow.color));

        fxRectangle.setEffect(dropShadow);
    };

    /**
     * merge text properties with default values
     */
    _buildProperties = function () {
        properties = merge(
            {
                offsetX: 0,
                offsetY: 0,
                color: '#FFFFFF',
                rotation: 0,
                shadow: {
                    size: 0,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    offsetX: 0,
                    offsetY: 0
                },
                border: {
                    size: 0,
                    color: {
                        r:1,
                        g:1,
                        b:1,
                        a:0
                    },
                    position: 'centered'
                }
            },
            params
        );
    };

    _buildRectangle = function () {
        var
            _getBorderPosition,
            _getOffsetX,
            _getOffsetY;

        _getBorderPosition = function () {
            switch (properties.border.position) {
                case 'inside':
                    return Packages.javafx.scene.shape.StrokeType.INSIDE;
                case 'centered':
                    return Packages.javafx.scene.shape.StrokeType.CENTERED;
                case 'outside':
                    return Packages.javafx.scene.shape.StrokeType.OUTSIDE;
            }
        };

        _getOffsetX = function () {
            var offset = 0;

            if (properties.shadow !== undefined && properties.shadow.size > 0) {
                offset += properties.shadow.size/2;
            }

            if (properties.offsetX !== undefined) {
                offset += properties.offsetX;
            }

            return offset;
        };

        _getOffsetY = function () {
            var offset = 0;

            if (properties.shadow !== undefined && properties.shadow.size > 0) {
                offset += properties.shadow.size/2;
            }

            if (properties.offsetY !== undefined) {
                offset += properties.offsetY;
            }

            return offset;
        };

        fxRectangle = new Packages.javafx.scene.shape.Rectangle();

        fxRectangle.setWidth(properties.width);
        fxRectangle.setHeight(properties.height);

        fxRectangle.setX(_getOffsetX());
        fxRectangle.setY(_getOffsetY());

        if (properties.rotation !== undefined && properties.rotation !== 0) {
            fxRectangle.getTransforms().add(
                new Packages.javafx.scene.transform.Rotate(
                    properties.rotation,
                    that.getWidth()/2,
                    that.getHeight()/2
                )
            );
        }

        fxRectangle.setFill(cs.obj.FXColorFactory(properties.color));

        if (properties.border.size > 0) {
            fxRectangle.setStroke(cs.obj.FXColorFactory(properties.border.color));
            fxRectangle.setStrokeWidth(properties.border.size);
            fxRectangle.setStrokeType(_getBorderPosition());
        }
    };

    _finalize = function () {
        var
            lock = new Packages.java.util.concurrent.CountDownLatch(1);

        runnableFuncArgs = {
            run: function () {
                var
                    scene,
                    sceneRoot;

                sceneRoot = new Packages.javafx.scene.Group();
                sceneRoot.getChildren().add(fxRectangle);

                scene = new Packages.javafx.scene.Scene(
                    sceneRoot,
                    that.getWidth(),
                    that.getHeight(),
                    cs.obj.FXColorFactory({r: 0, g:0, b:0, a:0})
                );

                that.rawSlimLayer.image = Packages.javafx.embed.swing.SwingFXUtils.fromFXImage(
                    scene.snapshot(null),
                    null
                );

                // decrease count down latch
                lock.countDown();
            }
        };

        new Packages.javafx.embed.swing.JFXPanel();

        runnable = new Packages.java.lang.Runnable(runnableFuncArgs);
        Packages.javafx.application.Platform.runLater(runnable);

        // wait until count down latch reaches 0
        lock.await();
    };

    _buildProperties();
    _buildRectangle();

    if (properties.shadow !== undefined && properties.shadow.size > 0) {
        _addShadow();
    }

    _finalize();

    return this;
};

/**
 * Draw any type of JavaFX shape (path, rectangle, text, ...)
 *
 * style.offsetX ......................... horizontal offset in layer
 * style.offsetY ......................... vertical offset in layer
 * style.shadow.size ..................... shadow size
 * style.shadow.color .................... shadow color
 * style.shadow.offsetX .................. horizontal shadow offset
 * style.shadow.offsetY .................. vertical shadow offset
 *
 * @param {Packages.javafx.scene.shape.Path} shape - JavaFX shape
 * @param {object} style - configuration params
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.drawShapeFX = function (shape, style) {
    var
        _addShadow,
        _buildProperties,
        _finalize,
        properties,
        that = this;

    _addShadow = function () {
        var
            dropShadow;

        dropShadow = new Packages.javafx.scene.effect.DropShadow();

        dropShadow.setRadius(properties.shadow.size);
        dropShadow.setOffsetX(properties.shadow.offsetX);
        dropShadow.setOffsetY(properties.shadow.offsetY);
        dropShadow.setColor(cs.obj.FXColorFactory(properties.shadow.color));

        shape.setEffect(dropShadow);
    };

    /**
     * merge text properties with default values
     */
    _buildProperties = function () {
        properties = merge(
            {
                offsetX: 0,
                offsetY: 0,
                shadow: {
                    size: 0,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    offsetX: 0,
                    offsetY: 0
                }
            },
            style
        );
    };

    _finalize = function () {
        var
            lock = new Packages.java.util.concurrent.CountDownLatch(1);

        runnableFuncArgs = {
            run: function () {
                var
                    scene,
                    sceneRoot;

                sceneRoot = new Packages.javafx.scene.Group();
                sceneRoot.getChildren().add(shape);

                scene = new Packages.javafx.scene.Scene(
                    sceneRoot,
                    that.getWidth(),
                    that.getHeight(),
                    cs.obj.FXColorFactory({r: 0, g:0, b:0, a:0})
                );

                that.rawSlimLayer.image = Packages.javafx.embed.swing.SwingFXUtils.fromFXImage(
                    scene.snapshot(null),
                    null
                );

                // decrease count down latch
                lock.countDown();
            }
        };

        new Packages.javafx.embed.swing.JFXPanel();

        runnable = new Packages.java.lang.Runnable(runnableFuncArgs);
        Packages.javafx.application.Platform.runLater(runnable);

        // wait until count down latch reaches 0
        lock.await();
    };

    _buildProperties();

    if (properties.shadow !== undefined && properties.shadow.size > 0) {
        _addShadow();
    }

    _finalize();

    return this;
};

/**
 * Draw Java AWT text on current SlimLayer.
 *
 * @todo: get system specific default font
 * @todo: transfer to java
 * @todo: add shadow (http://zetcode.com/gfx/java2d/textfonts/)
 *
 * params.text ....... the text content
 * params.x .......... horizontal offset
 * params.y .......... vertical offset
 * params.fontColor .. text color
 * params.fontName ... font
 * params.fontSize ... text size
 * params.bold ....... bold (flag)
 * params.italic ..... italic (flag)
 * params.rotation ... rotation angle (default: 0)
 * params.align ...... left|center|right (default: left)
 *
 * @param {object} params
 * @return {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.drawText = function (params) {
    var
        buildProperties,
        drawLines,
        setFontProperties,
        rotateText,
        properties,
        g2d = this.raw.image.createGraphics(),
        that = this;

    if (params.text === undefined) {
        console.log('yout have to set at least the text-param');
        return;
    }

    /**
     * merge text properties with default values
     */
    buildProperties = function () {
        var
            properties = {};

        properties.text = params.text;
        properties.x = (params.x) ? params.x : 0;
        properties.y = (params.y) ? params.y : 0;
        properties.fontColor = (params.fontColor) ? cs.obj.ColorFactory(params.fontColor) : cs.obj.ColorFactor('#000000');
        properties.fontName = (params.fontName) ? params.fontName : 'Arial';
        properties.fontSize = (params.fontSize) ? params.fontSize : 12;
        properties.bold = (params.bold) ? params.bold : false;
        properties.italic = (params.italic) ? params.italic : false;
        properties.rotation = (params.rotation) ? params.rotation : 0;
        properties.align = (params.align) ? params.align : 'left';
        properties.shadow = (params.shadow) ? params.shadow : false;

        return properties;
    };

    /**
     * draw all text lines
     */
    drawLines = function () {
        var
            lines = properties.text.split("<br>"),
            offsetX,
            offsetY = properties.y,
            getHorizontalOffsetForAlignment,
            setRenderingHints;

        getHorizontalOffsetForAlignment = function (text) {
            var
                fontMetrics;

            if (properties.align === 'left') {
                return properties.x;
            }

            if (properties.align === 'center') {
                fontMetrics = g2d.getFontMetrics();
                return (that.getWidth() - fontMetrics.stringWidth(text)) / 2 + properties.x;
            }
        };

        setRenderingHints = function (graphics2d) {
            graphics2d.setRenderingHint(
                Packages.java.awt.RenderingHints.KEY_TEXT_ANTIALIASING,
                Packages.java.awt.RenderingHints.VALUE_TEXT_ANTIALIAS_ON
            );

            graphics2d.setRenderingHint(
                Packages.java.awt.RenderingHints.KEY_FRACTIONALMETRICS,
                Packages.java.awt.RenderingHints.VALUE_FRACTIONALMETRICS_ON
            );
        };

        setRenderingHints(g2d);

        for (var index in lines) {
            offsetX = getHorizontalOffsetForAlignment(lines[index]);

            g2d.drawString(
                lines[index],
                offsetX,
                offsetY
            );

            offsetY += g2d.getFontMetrics().getHeight();
        }
    };

    /**
     * finalize the text painting
     */
    finalize = function () {
        g2d.dispose();
    };


    /**
     * set font properties used for painting the text.
     *
     * @param {type} graphics
     */
    setFontProperties = function (graphics) {
        var
            style = 0;

        graphics.setPaint(properties.fontColor);

        //create style bitmask
        if (properties.bold) {
            style = style | Packages.java.awt.Font.BOLD;
        }

        if (properties.italic) {
            style = style | Packages.java.awt.Font.ITALIC;
        }

        graphics.setFont(
            new Packages.java.awt.Font(
                properties.fontName,
                style,
                properties.fontSize
            )
        );
    };

    /**
     * set rotation for text
     */
    rotateText = function () {
        g2d.rotate(Packages.java.lang.Math.toRadians(properties.rotation));
    };

    properties = buildProperties();
    setFontProperties(g2d);

    if (params.rotation !== undefined) {
        rotateText();
    }

    drawLines();
    finalize();

    return this;
};


/**
 * Draw JavaFX text on current SlimLayer.
 *
 * @todo: get system specific default font
 * @todo: transfer to java
 *
 * params.text ........... the text content
 * params.x .............. horizontal offset
 * params.y .............. vertical offset
 * params.font.color ..... text color (hex|rgba)
 * params.font.name ...... font
 * params.font.size ...... text size
 * params.font.weight .... bold (flag)
 * params.font.italic .... italic (flag)
 * params.font.align ..... left|center|right
 * params.font.valign .... top|center|bottom
 * params.rotation ....... rotation angle
 * params.shadow.size .... size of text shadow
 * params.shadow.color ... color of text shadow (hex|rgba)
 * params.shadow.xOffset . vertical shadow offset
 * params.shadow.yOffset . horizontal shadow offset
 * params.outline.size ... size of text outline
 * params.outline.color .. color of text outline (hex|rgba)
 *
 * @param {object} params
 * @return {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.drawTextFX = function (params) {
    var
        _addRotation,
        _addShadow,
        _addOutline,
        _buildFxText,
        _buildProperties,
        _finalize,
        fxText,
        properties,
        that = this;

    if (params === undefined || params.text === undefined) {
        cs.console.log('yout have to set at least the text-param');
        return;
    }

    _addRotation = function () {
        fxText.getTransforms().add(
            new Packages.javafx.scene.transform.Rotate(
                properties.rotation,
                that.getWidth()/2,
                that.getHeight()/2
            )
        );
    };

    _addShadow = function () {
        var
            dropShadow;

        dropShadow = new Packages.javafx.scene.effect.DropShadow();

        dropShadow.setRadius(properties.shadow.size);
        dropShadow.setOffsetX(properties.shadow.xOffset);
        dropShadow.setOffsetY(properties.shadow.yOffset);

        fxText.setEffect(dropShadow);
    };

    _addOutline = function () {
        var
            style = fxText.getStyle();

        style += '-fx-stroke-width: ' + properties.outline.size + ';';
        style += '-fx-stroke: ' + properties.outline.color + ';';
        style += '-fx-stroke-type: outside;';

        fxText.setStyle(style);
    };

    _buildFxText = function () {
        var
            cssStyle;

        fxText = new Packages.javafx.scene.text.Text();
        fxText.setText(properties.text.replace('<br>', "\n"));

        fxText.setFont(
            Packages.javafx.scene.text.Font.font(
                properties.font.name,
                properties.font.size
            )
        );

        fxText.setFill(
            cs.obj.FXColorFactory(properties.font.color)
        );

        cssStyle = '-fx-font-weight: ' + properties.font.weight + ';';

        if (properties.font.italic) {
            cssStyle += '-fx-font-style: italic;';
        }


        fxText.setStyle(cssStyle);

        fxText.setX(properties.x);
        fxText.setY(properties.y);

        switch (properties.font.align) {
            case 'center':
                fxText.setTextAlignment(Packages.javafx.scene.text.TextAlignment.CENTER);
                break;
            case 'right':
                fxText.setTextAlignment(Packages.javafx.scene.text.TextAlignment.RIGHT);
                break;
            default:
                fxText.setTextAlignment(Packages.javafx.scene.text.TextAlignment.LEFT);
                break;
        }

        switch (properties.font.valign) {
            case 'center':
                fxText.setTextOrigin(Packages.javafx.geometry.VPos.CENTER);
                break;
            case 'bottom':
                fxText.setTextOrigin(Packages.javafx.geometry.VPos.BOTTOM);
                break;
            default:
                fxText.setTextOrigin(Packages.javafx.geometry.VPos.TOP);
                break;
        }

        fxText.setFontSmoothingType(Packages.javafx.scene.text.FontSmoothingType.LCD);
    };

    /**
     * merge text properties with default values
     */
    _buildProperties = function () {
        properties = merge(
            {
                x: 0,
                y: 0,
                rotation: 0,
                font: {
                    size: 12,
                    name: 'Arial',
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    weight: 400,
                    italic: false,
                    align: 'left',
                    valign: 'top'
                },
                shadow: {
                    size: 0,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    xOffset: 0,
                    yOffset: 0
                },
                outline: {
                    size: 0,
                    color: '#FFFFFF'
                }
            },
            params
        );
    };

    _finalize = function () {
        var
            lock = new Packages.java.util.concurrent.CountDownLatch(1);

        runnableFuncArgs = {
            run: function () {
                var
                    scene,
                    sceneRoot;

                sceneRoot = new Packages.javafx.scene.Group();
                sceneRoot.getChildren().add(fxText);

                scene = new Packages.javafx.scene.Scene(
                    sceneRoot,
                    that.getWidth(),
                    that.getHeight(),
                    cs.obj.FXColorFactory({r: 0, g:0, b:0, a:0})
                );

                that.rawSlimLayer.image = Packages.javafx.embed.swing.SwingFXUtils.fromFXImage(
                    scene.snapshot(null),
                    null
                );

                // decrease count down latch
                lock.countDown();
            }
        };

        new Packages.javafx.embed.swing.JFXPanel();

        runnable = new Packages.java.lang.Runnable(runnableFuncArgs);
        Packages.javafx.application.Platform.runLater(runnable);

        // wait until count down latch reaches 0
        lock.await();
    };

    _buildProperties();
    _buildFxText();

    if (properties.outline.size > 0) {
        _addOutline();
    }

    if (properties.shadow.size > 0) {
        _addShadow();
    }

    if (properties.rotation !== 0) {
        _addRotation();
    }

    _finalize();

    return this;
};

/**
 * Check if slimLayer equals current SlimLayer instance.
 *
 * @todo: test this stuff
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to compare with
 * @returns {bool}
 */
cs.obj.SlimLayer.prototype.equals = function (slimLayer) {
    return this.raw.equals(
        slimLayer.getRaw()
    );
};

/**
 * Export SlimLayer to common image (png/jpeg/...).
 *
 * @param {string} path - file path for export
 * @param {string} name - file name for export
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.export = function (path, name) {
    this.raw.writeTo(path + name);
    return this;
};

/**
 * Get first child element.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.firstChild = function () 
{
    return new cs.obj.SlimLayer(
        this.raw.firstChild()
    );
};

/**
 * Get SlimLayer average color in hex|rgba.
 *
 * @todo: test this stuff
 *
 * @param {string} format [hex|rgba]
 * @returns {object|string}
 */
cs.obj.SlimLayer.prototype.getAverageColor = function (format) {
    var
        colorFormat = (format) ? format : 'hex',
        javaColor = this.raw.getAverageColorObject(),
        hexString;

    if (colorFormat === 'rgba') {
        return {
            r : javaColor.getRed(),
            g : javaColor.getGreen(),
            b : javaColor.getBlue(),
            a : javaColor.getAlpha()
        };
    } else if (colorFormat === 'hex') {
        hexString = Packages.java.lang.Integer.toHexString(javaColor.getRGB());
        return hexString.substring(2, hexString.length());
    }
};

/**
 * Get bottom value in vertical direction.
 *
 * @todo: test this stuff
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getBottom = function () {
    return this.raw.getBottom();
};

/**
 * Get child SlimLayer of current SlimLayer at index.
 *
 * @todo: test this stuff
 *
 * @treeTraversal
 *
 * @param {integer} index - position index in list of child layers
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.getChildAt = function (index) {
    return new cs.obj.SlimLayer(
        this.raw.getChildAt(index)
    );
};

/**
 * Get child SlimLayers of current SlimLayer as an array.
 *
 * @treeTraversal
 *
 * @param {integer} index - position index in list of child layers
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.getChildren = function (index) {
    var childLayers = this.raw.getChildNodes(),
        wrappedChildNodes = [];
    for(var i = 0; i<childLayers.length; i++){
        wrappedChildNodes[i] = new cs.obj.SlimLayer(childLayers[i]);
    }
    return wrappedChildNodes;
};

/**
 * Get child SlimLayer of current SlimLayer at index.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getChildCount = function () {
    return this.raw.getChildCount();
};

/**
 * Get layer height.
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getHeight = function () {
    return this.raw.getHeight();
};

/**
 * Get the horizontal middle as integer.
 * 
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getHorizontalMiddle = function () {
    return this.raw.getHorizontalMiddle();
};

/**
 * Get index of current SlimLayer instance in SmallLayeredImage.
 *
 * @todo: test this stuff
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getIndex = function () {
    return this.raw.getIndex();
};

/**
 * Get the layer as java buffered image.
 * 
 * @returns {Packages.java.awt.image.BufferedImage}
 */
cs.obj.SlimLayer.prototype.getImage = function () {
    return this.raw.getImage();
};

/**
 * Get left value in horizontal direction.
 *
 * @todo: test this stuff
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getLeft = function () {
    return this.raw.getLeft();
};

/**
 * Get the layer name.
 * 
 * @returns {string}
 */
cs.obj.SlimLayer.prototype.getName = function () {
    return this.raw.getName();
};

/**
 * Get raw SlimLayer instance.
 *
 * @returns {Packages.de.projektmotor.slim.viewer.image.SlimLayer}
 */
cs.obj.SlimLayer.prototype.getRaw = function () {
    return this.raw;
};

/**
 * Get right value in horizontal direction.
 *
 * @todo: test this stuff
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getRight = function () {
    return this.raw.getRight();
};

/**
 * Get superior SmallLayeredImage.
 *
 * @returns {cs.obj.SmallLayeredImage|null}
 */
cs.obj.SlimLayer.prototype.getSmallLayeredImage = function () {
    if (this.raw.getSlimage() === undefined) {
        return null;
    }

    return new cs.obj.SmallLayeredImage(this.raw.getSlimage());
};

/**
 * Get style ranges for text layer.
 * 
 * @returns {array}
 */
cs.obj.SlimLayer.prototype.getStyleRanges = function () {
    return this.raw.getStyleRanges();
};

/**
 * Get top value in vertical direction.
 *
 * @todo: test this stuff
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getTop = function () {
    return this.raw.getTop();
};

/**
 * Get layer type as text.
 * 
 * @returns {string}
 */
cs.obj.SlimLayer.prototype.getType = function () {
    return this.raw.getType();
};

/**
 * Get the vertical middle as integer.
 * 
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getVerticalMiddle = function () {
    return this.raw.getVerticalMiddle();
};

/**
 * Get layer width.
 *
 * @returns {integer}
 */
cs.obj.SlimLayer.prototype.getWidth = function () {
    return this.raw.getWidth();
};

/**
 * Add new child to current SlimLayer at position index.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new child
 * @param {integer} index - position in list of child layers (0: at top of layer stack|null: at bottom|integer: at position)
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.insertChild = function (slimLayer, index)
{
    this.raw.insertChild(slimLayer.getRaw(), index);

    return this;
};

/**
 * Check if current SlimLayer instance is the root node of according
 * SmallLayeredImage.
 * 
 * @returns {bool}
 */
cs.obj.SlimLayer.prototype.isRoot = function ()
{
    return this.raw.isSelected();
};

/**
 * Check if current SlimLayer instance is marked as selected (e.g. by image panel).
 * 
 * @returns {bool}
 */
cs.obj.SlimLayer.prototype.isSelected = function ()
{
    return this.raw.isSelected();
};

/**
 * Add new sibling before current SlimLayer.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new sibling
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.insertBefore = function (slimLayer)
{
    this.raw.insertBefore(slimLayer.getRaw());

    return this;
};

/**
 * Add new sibling after current SlimLayer.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new sibling
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.insertBehind = function (slimLayer)
{
    this.raw.insertBehind(slimLayer.getRaw());

    return this;
};

/**
 * Get larst child element.
 * 
 * @treeTraversal
 * 
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.lastChild = function () 
{
    return new cs.obj.SlimLayer(
        this.raw.lastChild()
    );
};

/**
 * Get the previous sibling element of the current SlimLayer instance.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.previousSibling = function ()
{
    return new cs.obj.SlimLayer(this.raw.previousSibling());
};

/**
 * Get the next (following) sibling element of the current SlimLayer instance.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.nextSibling = function ()
{
    return new cs.obj.SlimLayer(this.raw.nextSibling());
};

/**
 * Get the parent element of the current SlimLayer instance.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.parent = function ()
{
    return new cs.obj.SlimLayer(this.raw.parent());
};

/**
 * Prepend new child to current SlimLayer.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new child
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.prependChild = function (slimLayer)
{
    this.raw.prependChild(slimLayer.getRaw());

    return this;
};

/**
 * Remove current slimLayer from SmallLayeredImage.
 * 
 * @treeTraversal
 *
 * @todo: test this stuff
 */
cs.obj.SlimLayer.prototype.remove = function ()
{
    this.raw.remove();
};

/**
 * Remove slimLayer from list of child elements.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to add as new child
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.removeChild = function (slimLayer)
{
    this.raw.removeChild(slimLayer.getRaw());

    return this;
};

/**
 * Remove slimLayer from list of child elements at given position.
 *
 * @todo: test this stuff
 * 
 * @treeTraversal
 *
 * @param {integer} position - index of child to be removed
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.removeChildAt = function (position)
{
    this.raw.removeChildAt(position);

    return this;
};

/**
 * Set background color of layer.
 *
 * @param {integer} red - 0...255
 * @param {integer} green - 0...255
 * @param {integer} blue - 0...255
 * @param {integer} alpha - 0...255
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setBackgroundColor = function (red, green, blue, alpha) {
    this.raw.drawRect(
        0,
        0,
        this.raw.getWidth(),
        this.raw.getHeight(),
        cs.obj.color.rgba(red, green, blue, alpha)
    );

    return this;
};

/**
 * Set layer bounds in SmallLayeredImage.
 *
 * @param {integer} x - vertical offset 
 * @param {integer} y - horizontal offset
 * @param {integer} width - horizontal size
 * @param {integer} height -  vertical size
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setBounds = function (x, y, width, height) {
    this.raw.setBounds(x, y, width, height);

    return this;
};

/**
 * Set the parent SlimLayer of current SlimLayer instance.
 *
 * @param {cs.obj.SlimLayer} slimLayer - layer to set as new parent
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setParent = function (slimLayer) {
    this.raw.setParent(slimLayer.raw);

    return this;
};

/**
 * Set superior SmallLayeredImage.
 *
 * @param {cs.obj.SmallLayeredImage} smallLayeredImage
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setSmallLayeredImage = function (smallLayeredImage) {
    this.raw.setSlimage(smallLayeredImage.getRaw());

    return this;
};

/**
 * Set vertical postion of layer in image.
 *
 * @param {integer} offsetX - horizontal offset
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setX = function (offsetX) {
    this.raw.setX(offsetX);

    return this;
};

/**
 * Set horizontal postion of layer in image.
 *
 * @param {integer} offsetY - vertical offset
 * @returns {cs.obj.SlimLayer}
 */
cs.obj.SlimLayer.prototype.setY = function (offsetY) {
    this.raw.setY(offsetY);

    return this;
};
