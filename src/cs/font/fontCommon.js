
var cs = cs || {};
cs.font = cs.font || {};

cs.font.chooseStyleCompletion = function (valueRetriever) {
    var
            layers = cs.panel.image.getActiveSlimage().getSelectedLayers(),
            layer;

    if (!layers || layers.length <= 0) {
        return "";
    }

    layer = layers[0];
    var completion = "";
    var styles = layer.getStyles();
    if (styles.length > 1) {
        //generate list entries for dialog
        var dialogEntries = [];
        var cnt = 0;
        for (var i = 0; i < styles.length; i++) {
            var style = styles.get(i);
            var value = valueRetriever.getValue(style);
            if(value.length === 0){ 
                continue;
            }
            dialogEntries[cnt] = value + " -> '" + cs.font.trimText(style.getText(), 30) + "'";
            cnt++;
        }

        //show dialog
        var dialogResult = window.optionDialogList("select completion from available options", dialogEntries, false);
        if(dialogResult === null || dialogResult === undefined){ 
            return "";
        }
        var selection = new Packages.java.lang.String(dialogResult[0]);
        var end = selection.indexOf(" ->");
        if(end == -1){
            end = selection.length();
        }
        completion = selection.substring(0, end);
    } else {
        //use first entry
        completion = valueRetriever.getValue(styles[0]);
    }
    return completion;
};

cs.font.trimText = function(text, trimLen){
   //window.alert("txtLen: "+(text.length() - 1) + ", trimmedTo " + trimLen + ", min: " + cs.font.min(text.length() - 1, trimLen));
   var trimmed = new String(text).substring(0, Math.min(text.length(), trimLen));
   if(text.length > trimLen){
       window.alert("txtLen: "+(text.length() - 1) + ", trimmedTo " + trimLen);
       trimmed = trimmed + "[...]";
   }
   return trimmed;
};

cs.font.min = function(a, b){
    if(a <= b) return a;
    return b;
};