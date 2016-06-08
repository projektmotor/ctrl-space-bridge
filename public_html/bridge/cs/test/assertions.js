/* global tests */

"use strict";

var cs = cs || {};
cs.test = cs.test || {};
cs.test.assertions = cs.test.assertions || {};

/**
 * Asserts if the given value / expression is true.
 * 
 * @param {mixed} value
 */
cs.test.assertions.assertTrue = function (value) 
{
    tests.assertTrue(value);
};

/**
 * Asserts if the given strings (string1 & string2) are identical.
 * 
 * @param {String} string1
 * @param {String} string2
 */
cs.test.assertions.assertEquals = function (string1, string2) 
{
    tests.assertEquals(string1, string2);
};

/**
 * Asserts if the given values are identical.
 * 
 * @param {String} value1
 * @param {String} value2
 */
cs.test.assertions.assertNotEquals = function (value1, value2) 
{
    var
        equal = (value1 === value2) ? false : true;

    tests.assertTrue(equal);
};