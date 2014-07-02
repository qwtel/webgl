define([
  'gl',
  'glm'
], function (/** @type {WebGLRenderingContext} */ gl, glm) {
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
    shaders.forEach(function (shader) {
      gl.detachShader(this.object, shader.object);
    }, this);

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
  
  Program.prototype.setUniform = function(uniformName, value) {
    if (!isNaN(value)) {
      gl.uniform1f(this.uniform(uniformName), value);
    } else if (value instanceof glm.Vec2) {
      gl.uniform2fv(this.uniform(uniformName), glm.valuePtr(value));
    } else if (value instanceof glm.Vec3) {
      gl.uniform3fv(this.uniform(uniformName), glm.valuePtr(value));
    } else if (value instanceof glm.Vec4) {
      gl.uniform4fv(this.uniform(uniformName), glm.valuePtr(value));
    } else if (value instanceof glm.Mat2) {
      gl.uniformMatrix2fv(this.uniform(uniformName), false, glm.valuePtr(value));
    } else if (value instanceof glm.Mat3) {
      gl.uniformMatrix3fv(this.uniform(uniformName), false, glm.valuePtr(value));
    } else if (value instanceof glm.Mat4) {
      gl.uniformMatrix4fv(this.uniform(uniformName), false, glm.valuePtr(value));
    }
  };
  
  Program.prototype.setVertexAttrib = function(attribName, value) {
    if (!isNaN(value)) {
      gl.vertexAttrib1f(this.attrib(attribName), value);
    } else if (value instanceof glm.Vec2) {
      gl.vertexAttrib2fv(this.attrib(attribName), glm.valuePtr(value));
    } else if (value instanceof glm.Vec3) {
      gl.vertexAttrib3fv(this.attrib(attribName), glm.valuePtr(value));
    } else if (value instanceof glm.Vec4) {
      gl.vertexAttrib4fv(this.attrib(attribName), glm.valuePtr(value));
    } else if (value instanceof glm.Mat2) {
      console.error("Not implemented");
    } else if (value instanceof glm.Mat3) {
      console.error("Not implemented");
    } else if (value instanceof glm.Mat4) {
      console.error("Not implemented");
    }
  };

  return Program;
});

