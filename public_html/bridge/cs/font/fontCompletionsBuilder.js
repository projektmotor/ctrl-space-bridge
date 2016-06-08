
var cs = cs || {};
cs.font = cs.font || {};
cs.font.completionsbuilder = cs.font.completionsbuilder || {};

/**
 * takes a list of property names that must come up in propRetriever.getValue below.
 * with that list, code completion items are built dynamically.
 * the values of those items re fetch with the propRetriever.getValue() function which delegates the call to the style object and the according getter.
 * @param {type} propertyNames
 * @returns {undefined}
 */
cs.font.completionsbuilder.build = function (propertyNames) {
    for (var i = 0; i < propertyNames.length; i++) {
        //window.alert("prop name: "+propertyNames[i]);
        var conf = {
            name: propertyNames[i],
            scope: 'text/css',
            onSelect: function (completionObject) {
            },
            onBlur: function () {
            },
            onSubmit: function () {
                //window.alert("getting value:" + conf.name);
                var nameStored=this.name;//THIS DOES THE TRICK TO HAVE THIS.NAME AVAILABLE IN getValue below
                var completion = cs.font.chooseStyleCompletion({
                    getValue: function (hostObject) {
//                        for(var itm in hostObject){console.out("h:"+itm)}
//                        for(var itm in this){console.out("t:"+itm)}
                        console.out(nameStored);
                        return cs.font.completionsbuilder.propRetriever.getValue(hostObject, nameStored);
                    }
                });
                console.out(this.name + ": " + completion + ";");
                
                return this.name + ": " + completion + ";";
            }
        };
        cs.extend.addAutocompletion(conf);
    }
}

cs.font.completionsbuilder.propRetriever = {
    /**
     * retrieves a property of a font object by a given identifier
     * @param {JSStyle} hostObject object to call getter from
     * @param {String} propIdent ident which is mapped to the right getter e.g. font-style will result in hostObject.getFontStyle()
     * @returns {String} the value returned by the called getter
     */
    getValue: function (hostObject, propIdent) {
        //window.alert("got prop getter request for: "+propIdent);
        var value = "";
        switch (propIdent) {
            case "font-style":
                value = hostObject.getFontStyle();
                break;
            case "font-variant":
                value = hostObject.getFontVariant();
                break;
            case "font-weight":
                value = hostObject.getFontWeight();
                break;
            case "font-size":
                value = hostObject.getFontSize();
                break;
            case "line-height":
                value = hostObject.getLineHeight();
                break;
            case "font-family":
                value = hostObject.getFontFamily();
                break;
            case "letter-spacing":
                value = hostObject.getLetterSpacing();
                break;
            case "word-spacing":
                value = hostObject.getWordSpacing();
                break;
            case "text-transform":
                value = hostObject.getTextTransform();
                break;
            case "text-decoration":
                value = hostObject.getTextDecoration();
                break;
            case "text-align":
                value = hostObject.getTextAlign();
                break;
            case "color":
                value = hostObject.getColor();
                break;
        }
        //window.alert("host= " + hostObject + ", propident: " + propIdent + "=" + "'" + value + "'");
        return value;
    }
};