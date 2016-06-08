/* global completions, Packages */

var cs = cs || {};
cs.extend = cs.extend || {};

/**
 * Extend Ctrl-Space autocompletions.
 * 
 * params.name              the code completion name (e.g. margin-top)
 * params.scope             the file scope (e.g. text/css)
 * params.onSelect          callback executed when code completion is selected
 * params.onBlur            callback executed when leaving code completion item
 * params.onSubmit          callback executed code completion item is triggered
 * 
 * @param {Object} configuration - configuration params
 */
cs.extend.addAutocompletion = function (configuration) {
    var
        config,
        codeCompletion,
        builder;

    /* @todo: use merge here */
    config = configuration;


    codeCompletion = new Packages.api.Collector({
        collect: function(resultSet, query){

            var 
                modifier, 
                selectAction, 
                item;

            //completion with modifier
            modifier = new Packages.api.Modifier({
               modify: function() {
                   return config.onSubmit();
               }
            });
 
            selectAction = new Packages.api.SelectionAction({
                init: config.onSelect,
                remove: config.onBlur
            });
//            console.out("haystack: "+config.name+", needle:"+query);
            var replaced = new String(config.name.toLowerCase()).replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>');
            if(new Packages.java.lang.String(replaced).startsWith(new String(query).toLowerCase())){
                item = builder.createItem(config.name);
                item.addSelectionAction(selectAction);
                item.setModifier(modifier);
                
                resultSet.addItem(item);
            }
            
        }
    });
   
    builder = completions.add(config.scope, codeCompletion);
};
