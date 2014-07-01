define([
  'gl'
], function (/** @type {WebGLRenderingContext} */ gl) {
  function Program(shaders) {
    if (!shaders || shaders.length <= 0)
      throw new Error("No shaders were provided to create the program")

    this.object = gl.createProgram();

    //attach all the shaders
    shaders.forEach(function (shader) {
      gl.attachShader(this.object, shader.object);
    }, this);
    
    //link the shaders together
    gl.linkProgram(this.object);

    //detach all the shaders
    //shaders.forEach(function (shader) {
      //gl.detachShader(this.object, shader.object);
    //}, this);

    if (!gl.getProgramParameter(this.object, gl.LINK_STATUS))
      throw new Error("ERROR IN PROGRAM : " + gl.getProgramInfoLog(this.object));
  }

  Program.prototype.attrib = function (attribName) {
    var attrib = gl.getAttribLocation(this.object, attribName);
    
    if (attrib === -1)
      throw new Error("Program attribute not found: " + attribName);
    
    return attrib;
  };
  
  Program.prototype.uniform = function (uniformName) {
    var attrib = gl.getUniformLocation(this.object, uniformName);

    if (attrib === -1)
      throw new Error("Program uniform not found: " + uniformName);

    return attrib;
  };

  return Program;
});

