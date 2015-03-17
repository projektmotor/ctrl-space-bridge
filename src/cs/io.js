/* global io */
/* exported cs.io */

"use strict";

var cs = cs || {};
cs.io = cs.io || {};

/**
 * Close editor pane of currently opened file.
 * 
 * @param {string} path
 * @return {cs.io}
 */
cs.io.close = function (path) {
    io.close(path);
    return this;
};

/**
 * Check if path point to existing file.
 *
 * @param {string} path
 * @returns {bool}
 */
cs.io.fileExists = function (path) {
    return io.fileExists(path);
};

/**
 * Include script file.
 *
 * @param {string} path
 * @returns {cs.io}
 */
cs.io.include = function (path) {
    io.include(path);
    return this;
};

/**
 * Opens a file in the according editor.
 * 
 * @param {string} path
 * @returns {cs.io}
 */
cs.io.open = function (path) {
    io.open(path);
    return this;
};

/**
 * Read file into js string.
 *
 * @param {string} path
 * @returns {string}
 */
cs.io.read = function(path) {
    if (!io.fileExists(path)) {
        console.println('could not open file: ' + path);
        return null;
    }

    return io.loadFile(path);
};

/**
 * Read csv file into js array.
 *
 * @param {string} path
 * @returns {array}
 */
cs.io.readCsv = function(path) {
    var
        fileData,
        convertToArray;

    convertToArray = function (data, cellDelimiter, lineDelimiter) {
        var
            lines=data.split(lineDelimiter),
            result = [],
            headers=lines[0].split(cellDelimiter);

        for (var lineIndex in lines) {
            var
                lineObj = {},
                lineData=lines[lineIndex].split(",");

            if (parseInt(lineIndex) === 0) {
                continue;
            }

            for (var cellIndex in headers) {
                lineObj[headers[cellIndex]] = lineData[cellIndex];
            }

            result.push(lineObj);
        }

        return result;
    };

    fileData = cs.io.read(path);

    return (fileData)
        ? convertToArray(fileData, ',', "\n")
        : null;
};

/**
 * write filecontent to filesystem.
 *
 * @param {string} path
 * @param {string} content
 * @returns {cs.io}
 */
cs.io.write = function (path, content) {
    if (io.fileExists(path)) {
        console.println('file: '+path+' allready exists! replacing ...');
    }

    io.write(path, content);
    
    return this;
};
