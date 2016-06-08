
var cs = cs || {};
cs.blueprint = cs.blueprint || {};
cs.blueprint.extension = cs.blueprint.extension || {};

cs.blueprint.extension.generate = function (name, mime) {
    var tpl = io.loadFile("assets/CodeCompletionExtension.js");
    tpl = cs.templating.compile(tpl, {
        mime: mime, 
        name: name
    });
    return tpl;
}

cs.extend.addAutocompletion({
    name : 'completion stub',
    scope : 'text/javascript',
    onSelect : function(completionObject) {},
    onBlur : function() {},
    onSubmit : function() {
        var mime = window.optionDialogDropDown("select mime type", ["text/html", "text/css", "text/javascript"]);
        var name = window.input("Enter completion item name", "enter the name of completion item stub", "my extension");
        var code = cs.blueprint.extension.generate(name, mime);
        return code;
    }
});