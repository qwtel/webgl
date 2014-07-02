define(function () {
  var canvas = document.getElementById("canvas");

  try {
    /**
     * @type {WebGLRenderingContext}
     */
    var gl = canvas.getContext("experimental-webgl", {
      antialias: true
    });
  } catch (e) {
    alert("You are not webgl compatible :(");
    throw new Error("You are not webgl compatible :(");
  }
  
  if (!gl) throw new Error("You are not webgl compatible :(");
  
  if (debug) window.gl = gl;
  
  return gl;
});