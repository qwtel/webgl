define([
  'gl',
  'Promise'
], function (/** @type {WebGLRenderingContext} */ gl, Promise) {
  function Texture(image) {
    this.object = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.object);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  Texture.promiseFromUrl = function (imageUrl) {
    return new Promise(function (res, rej) {
      var image = new Image();
      image.onload = function () {
        res(new Texture(image));
      };
      image.onerror = function (e) {
        rej(e);
      };
      image.src = imageUrl;
    });
  };

  return Texture;
});
