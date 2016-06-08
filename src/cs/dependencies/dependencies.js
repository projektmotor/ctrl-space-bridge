
var cs = cs || {};
cs.util = cs.util || {};

cs.util.dependencies = {
    copyAssetDir: function (dir, targetDir) {
        var files = io.listFiles(dir);
        var targets = this.copyAssetFiles(files, targetDir);
        return targets;
    },
    copyAssetFiles: function (files, targetDir, docPath) {
        var curInclude;
        var targets = [];

        //to auto-insert necessary script link tags, check for each existing script tag
        
        console.println("files.length: " + files.length);
        for (var i = 0; i < files.length; i++) {
            curInclude = "assets/"+files[i];
            console.println("include: " + curInclude);
            if (!io.isAbsPath(curInclude)) {
                //is it rel path?
                curInclude = io.toAbsPath(curInclude);
                if (!io.fileExists(curInclude)) {
                    throw "file '" + curInclude + "' could not be found in assets directory";
                }
                console.println("include after toAbs: " + curInclude);
            }

            var mime = io.getMime(curInclude);
            //copy file to target dir, determine dir name by mime
            console.println("mime: " + mime);
            var targetPath = "";
            if (mime.equals("text/css")) {
                targetPath = project.defaultCSSPath + "/" + io.getName(curInclude) + "." + io.getExt(curInclude);
                targets[i] = fileManager.parseHTML('<link rel="stylesheet" type="text/css" media="screen" href="' + io.relPath(docPath, targetPath) + '"/>');
            } else if (mime.equals("text/javascript")) {
                targetPath = project.defaultJSPath + "/" + io.getName(curInclude) + "." + io.getExt(curInclude);
                targets[i] = fileManager.parseHTML('<script type="text/javascript" src="' + io.relPath(docPath, targetPath) + '"/>');
            } else {
                console.println("unknown mime: '" + curInclude + "'");
                return;
            }
            io.copy(curInclude, targetPath);
            console.println("copied file from '" + curInclude + "' to '" + targetPath + "'");
            console.println("created link '" + targets[i] + "'");
        }
        return targets;
    },
}
