define([
  'gl'
], function (/** @type {WebGLRenderingContext} */ gl) {
  function Shader(shaderCode, shaderType) {
    this.object = gl.createShader(shaderType);

    if (this.object === 0)
      throw new Error("glCreateShader failed");

    gl.shaderSource(this.object, shaderCode);
    gl.compileShader(this.object);

    if (!gl.getShaderParameter(this.object, gl.COMPILE_STATUS))
      throw new Error("ERROR IN " + shaderType + " SHADER : " + gl.getShaderInfoLog(this.object));
  }

  /**
   * @param {String} id - the DOM id of the script tag that contains the shader code
   * @param shaderType
   * @returns {Shader}
   */
  Shader.fromScriptTag = function (id, shaderType) {
    var tag = document.getElementById(id);
    if (tag === null) 
      throw new Error ("script tag " + id + " not found");

    return new Shader(tag.textContent, shaderType);
  };

  return Shader;
});