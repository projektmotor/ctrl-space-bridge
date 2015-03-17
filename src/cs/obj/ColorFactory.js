/* global Packages */
"use strict";

var cs = cs || {};
cs.obj = cs.obj || {};

/**
 * create java.awt.color Objects by rgba / hex notation
 *
 * @param {Object|String|Number} color
 * @returns {Packages.java.awt.Color}
 */
cs.obj.ColorFactory = function (color) {
    return (typeof color === 'string' || typeof color === 'number')
        ? new Packages.java.awt.Color.decode(color)
        : new Packages.java.awt.Color['(int,int,int,int)'](
            parseInt(color.r),
            parseInt(color.g),
            parseInt(color.b),
            parseInt(color.a)
        );
};

/**
 * create javafx.scene.paint.Color Objects by rgba / hex notation
 *
 * @param {Object|String|Number} color
 * @returns {Packages.java.awt.Color}
 */
cs.obj.FXColorFactory = function (color) {
    return (typeof color === 'string' || typeof color === 'number')
        ? Packages.javafx.scene.paint.Color.web(color)
        : Packages.javafx.scene.paint.Color.rgb(
            parseInt(color.r),
            parseInt(color.g),
            parseInt(color.b),
            parseInt(color.a)
        );
};