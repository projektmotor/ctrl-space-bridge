/* global blueprint, Packages */

"use strict";

var cs = cs || {};
cs.test = cs.test || {};

/**
 * Adds new Ctrl-Space test case.
 * 
 * @param {object} configuration
 */
cs.test.addTestCase = function (configuration)
{
    if (configuration.name === undefined || configuration.onRun === undefined) {
        throw new Error("name and run-callback has to be set!");
    }
    
    blueprint.registerTestCase(
        configuration.name, 
        new Packages.api.Function({
            run: configuration.onRun
        })
    );
};