/* global io */

// make global cs namespace available
var cs = cs || {};

io.include('./global.js');

io.include('./cs/io.js');
io.include('./cs/console.js');

// include extend libs
io.include('./cs/extend/addAutocompletion.js');
io.include('./cs/extend/addSimplifier.js');

io.include('./cs/layers/select.js');

// include panel libs
io.include('./cs/panel/css.js');
io.include('./cs/panel/html.js');
io.include('./cs/panel/image.js');

// include objects
io.include('./cs/obj/ColorFactory.js');
io.include('./cs/obj/Factory.js');
io.include('./cs/obj/CssFile.js');
io.include('./cs/obj/CssNode.js');
io.include('./cs/obj/HtmlFile.js');
io.include('./cs/obj/HtmlNode.js');
io.include('./cs/obj/SlimLayer.js');
io.include('./cs/obj/SmallLayeredImage.js');

// include test libs
io.include('./cs/test/addTestCase.js');
io.include('./cs/test/assertions.js');