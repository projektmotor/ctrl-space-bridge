/* global console */
/* exported cs.console */

"use strict";

var cs = cs || {};
cs.console = cs.console || {};

/**
 * log skalar or abstract data type to cs console
 *
 * @param {mixed} content - the log content
 * @returns {cs.console}
 */
cs.console.log = function (content) {
    var
        isScalar,
        isFunction,
        logObject;

    /**
     * check if element is scalar var
     *
     * @param {mixed} element
     * @returns {Boolean}
     */
    isScalar = function (element) {
        var
            scalar = false;

        // NULL
        if (element === null) {
            scalar = true;
        }

        // String Object
        if (
//            element !== null &&
//            typeof element === 'object' &&
//            element.constructor !== undefined &&
//            element.constructor.name === 'String'
            element instanceof String
        ) {
            scalar = true;
        }

        // string / number / function
        if (typeof element !== 'object' && typeof element !== 'function') {
            scalar = true;
        }

        return scalar;
    };

    /**
     * check if element is function var
     *
     * @param {type} element
     * @returns {Boolean}
     */
    isFunction = function (element) {
        return (typeof element === 'function')
            ? true
            : false;
    };

    /**
     * log abstract data type
     *
     * @param {type} object
     */
    logObject = function (object) {
        for (var index in object) {
            if (isScalar(object[index])) {
                console.log(index + ': ' + object[index] + "\n");
            } else if (isFunction(object[index])) {
                console.log(index + ': function()' + "\n");
            } else {
                console.log(index + ': ' + typeof object[index] + "\n");
            }
        }
    };

    (isScalar(content))
        ? console.log(content + "\n")
        : logObject(content, 0);

    return this;
};
