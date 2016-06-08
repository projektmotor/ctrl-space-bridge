
cs.extend.addAutocompletion({
    name : '{name}',
    scope : '{mime}',
    onSelect : function(completionObject) {
        //this code is executed when a user selects this entry in the completion window (either by click or via arrow keys)
        //you can e.G. draw hints on the image if you are using layer selections to generate the resulting code
    },
    onBlur : function() {
        //here is the place to put your cleanup code after the user left the completion item via click on an other item or pressing arrow keys.
        //e.G.remove drawed lines  if you drawed lnes on an image in the onSelect function
    },
    onSubmit : function() {
        var code = "";
        //whatever you return here, is written to the current cursor position.
        //you can make use of the full CTRL+SPACE API, open dialogs, load and write files etc.
        return code;
    }
});