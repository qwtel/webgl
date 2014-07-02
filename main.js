require([
  "gl",
  "glm",
  "Shader",
  "Program",
  "Texture",
  "assets/models/cube",
], function (/** @type {WebGLRenderingContext} */ gl, glm, Shader, Program, Texture, cube) {

  var vec2 = glm.vec2;
  var vec3 = glm.vec3;
  var vec4 = glm.vec4;
  var mat2 = glm.mat2;
  var mat3 = glm.mat3;
  var mat4 = glm.mat4;
  
  function loadShaders() {
    var shaders = [];
    shaders.push(Shader.fromScriptTag('vertex-shader', gl.VERTEX_SHADER));
    shaders.push(Shader.fromScriptTag('fragment-shader', gl.FRAGMENT_SHADER));
    var program = new Program(shaders);

    gl.useProgram(program.object);

    var view = glm.lookAt(vec3(3, 3, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    program.setUniform('view', view);

    var projection = glm.perspective(50, 640 / 480, 0.1, 100);
    program.setUniform('projection', projection);

    return program;
  }

  function loadTriangle(texture) {
    // Vertex coords
    var vertexDataVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataVbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.program.attrib("vert"));
    gl.vertexAttribPointer(this.program.attrib("vert"), 3, gl.FLOAT, false, 0, 0);

    // Per vertex tex coords
    var vertexTexDataVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexDataVbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.program.attrib("vertTexCoord"));
    gl.vertexAttribPointer(this.program.attrib("vertTexCoord"), 2, gl.FLOAT, true, 0, 0);

    // Texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture.object);
    this.program.setUniform("text", 0);
  }

  function enableZBuffer() {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
  }

  function render() {
    var deltaT;
    var time;

    var degreesRotated = 0;

    var update = function (time, deltaT) {
      
      //rotate by 1 degree
      degreesRotated += 1;

      //don't go over 360 degrees
      while (degreesRotated > 360) degreesRotated -= 360.0;
    }.bind(this);

    var draw = function () {
      //gl.viewport(0.0, 0.0, canvas.width, canvas.height);

      gl.clearColor(0, 0, 0, 1);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      var model = glm.rotate(mat4(), degreesRotated, vec3(0, 1, 0));
      this.program.setUniform("model", model);

      gl.drawArrays(gl.TRIANGLES, 0, 6 * 2 * 3);

      gl.flush();
    }.bind(this);

    function renderInner() {
      var now = new Date().getTime();
      deltaT = now - time;
      time = now;

      update(time, deltaT);
      draw();

      window.requestAnimationFrame(renderInner);
    }
    
    renderInner();
  }

  // DIVIDER

  function Stage1() {
  }

  /**
   * @returns {Stage1}
   */
  function start() {
    return new Stage1();
  }

  /**
   * @returns {Stage2}
   */
  Stage1.prototype.loadShaders = function () {
    var program = loadShaders.call(this);
    return new Stage2(program);
  };

  function Stage2(program) {
    this.program = program;
  }

  /**
   * @returns {Stage3}
   */
  Stage2.prototype.loadTriangle = function (texture) {
    loadTriangle.call(this, texture);
    return new Stage3(this.program);
  };

  function Stage3(program) {
    this.program = program;
  }

  /**
   * @returns {Stage3}
   */
  Stage3.prototype.enableZBuffer = function () {
    enableZBuffer.call(this);
    return this;
  };

  Stage3.prototype.loop = function () {
    render.call(this);
  };

  var p = Texture.promiseFromUrl("assets/textures/wooden-crate.jpg");
  var t = start().loadShaders();
  p.then(function (texture) {
    t.loadTriangle(texture).enableZBuffer().loop();
  }).catch(function(e) {
    console.log("Couldn't load texture", e)
  });
});
