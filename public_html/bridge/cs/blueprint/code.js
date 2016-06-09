
var cs = cs || {};
cs.blueprint = cs.blueprint || {};
cs.blueprint.extension = cs.blueprint.extension || {};

cs.blueprint.extension.generate = function (name, mime, file) {
    var tpl = io.loadFile(file);
    tpl = cs.templating.compile(tpl, {
        mime: mime, 
        name: name
    });
    return tpl;
}

cs.extend.addAutocompletion({
    name : 'Code Completion Snippet',
    scope : 'text/javascript',
    onSelect : function(completionObject) {},
    onBlur : function() {},
    onSubmit : function() {
        var mime = window.optionDialogDropDown("select mime type", ["text/html", "text/css", "text/javascript"]);
        var name = window.input("Enter completion item name", "enter the name of completion item stub", "my extension");
        var code = cs.blueprint.extension.generate(name, mime,"assets/CodeCompletionExtension.js");
        return code;
    }
});

cs.extend.addAutocompletion({
    name : 'Clickable Simplifier Snippet',
    scope : 'text/javascript',
    onSelect : function(completionObject) {},
    onBlur : function() {},
    onSubmit : function() {
        var name = window.input("Enter a Simplifier name", "enter the name of clickable simplifier", "click me!");
        var code = cs.blueprint.extension.generate(name, "","assets/ClickableSimplifier.js");
        return code;
    }
});