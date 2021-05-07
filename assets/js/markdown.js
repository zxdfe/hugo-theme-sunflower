// markdown.js
// function init_image_width_selector() {
//     var pat = new RegExp("#w-([^#^ ]+)");
//     for (elem of document.querySelectorAll("img[src*=\"#w-\"]")) {
//         var width = pat.exec(elem.src)[1];
//         console.log(elem, elem.src, width);
//         elem.style.width = width;
//     };
// }
// window.onload = function() {
//     init_image_width_selector();
// }

// markdown.md
// ![myimage](http://localhost/assets/image/myimage.jpg#width-20%#flag) <!-- 20% -->
// ![myimage](http://localhost/assets/image/myimage.jpg#width-100px#flag) <!-- 100px -->

// 可以在src中添加多个“#”标签，“width-”后面直接像css那样填写尺寸即可