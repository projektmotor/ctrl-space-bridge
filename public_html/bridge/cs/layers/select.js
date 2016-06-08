/* global cs, window, project */

var cs = cs || {};
cs.layers = cs.layers || {};
cs.layers.select = cs.layers.select || {};

cs.layers.select.active = function () {
  var image = project.activeImage;
  if (!image) {
    return [];
  }
  
  return window.getSelections(image.imageFile.getPath());
};