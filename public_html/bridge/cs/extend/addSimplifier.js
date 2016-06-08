/* global blueprint, Packages */

var cs = cs || {};
cs.extend = cs.extend || {};

/**
 * Create new Simplifier Blueprint.
 * 
 * configuration.name              the simplifier name (e.g. create-image)
 * configuration.onRun             method called on simplifier execution
 * 
 * @param {Object} configuration
 * @returns {undefined}
 */
cs.extend.addSimplifier = function(configuration)
{
    if (configuration.name === undefined || configuration.onRun === undefined) {
        window.alert(
            'missing arguments for adding simplifier'
        );
    }

    blueprint.registerSimplifier(
        configuration.name,
        new Packages.api.Function({
            run: configuration.onRun
        })
    );
};


