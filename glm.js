define([
  "bower_components/gl-matrix/dist/gl-matrix"
], function (glMatrix) {

  if (!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
  }

  function vecOperation(num, vec, Vec, matOp, vecOp, floatOp, other) {
    if (other instanceof Vec) {
      return vec(vecOp(vec().arr, this.arr, other.arr));
      //} else if (other instanceof Mat) {
      // return vec(vecOp(vec().arr, this.arr, other.arr));
    } else if (!isNaN(other)) {
      return vec(floatOp(this.x, other), floatOp(this.y, other), floatOp(this.z, other));
    } else {
      throw new Error("Can't add shit");
    }
  }

  function matOperation(num, mat, Mat, matOp, vecOp, floatOp, other) {
    if (other instanceof Mat) {
      return mat(matOp(mat().arr, this.arr, other.arr));
      //} else if (other instanceof Vec) {
      // return vec(vecOp(vec().arr, this.arr, other.arr));
    } else if (!isNaN(other)) {
      throw new Error("Implementation missing");
    } else {
      throw new Error("Can't add shit");
    }
  }

  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function mul(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }

  /**
   * @constructor
   */
  function Vec() {
  }

  /**
   * @constructor
   */
  function Mat() {
  }

  /**
   * @param {Number|Float32Array|Array} x
   * @param {Number} y
   * @constructor
   */
  function Vec2(x, y) {
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
      this.x = this.r = this.s = x[0];
      this.y = this.g = this.t = x[1];
    } else {
      this.arr = new GLMAT_ARRAY_TYPE(2);
      this.x = this.r = this.s = this.arr[0] = x;
      this.y = this.g = this.t = this.arr[1] = y;
    }
  }

  Vec2.prototype = new Vec();

  setMethods('vec2', 2, vec2, Vec2);

  /**
   * @param {Number|Float32Array|Array} x
   * @param {Number} y
   * @param {Number} z
   * @constructor
   */
  function Vec3(x, y, z) {
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
      this.x = this.r = this.s = x[0];
      this.y = this.g = this.t = x[1];
      this.z = this.b = this.u = x[2];
    } else {
      this.arr = new GLMAT_ARRAY_TYPE(3);
      this.x = this.r = this.s = this.arr[0] = x;
      this.y = this.g = this.t = this.arr[1] = y;
      this.z = this.b = this.u = this.arr[2] = z;
    }
  }

  Vec3.prototype = new Vec();

  setMethods('vec3', 3, vec3, Vec3);

  /**
   * @param {Number|Float32Array|Array} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   * @constructor
   */
  function Vec4(x, y, z, w) {
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
      this.x = this.r = this.s = x[0];
      this.y = this.g = this.t = x[1];
      this.z = this.b = this.u = x[2];
      this.w = this.a = this.v = x[3];
    } else {
      this.arr = new GLMAT_ARRAY_TYPE(4);
      this.x = this.r = this.s = this.arr[0] = x;
      this.y = this.g = this.t = this.arr[1] = y;
      this.z = this.b = this.u = this.arr[2] = z;
      this.w = this.a = this.v = this.arr[3] = w;
    }
  }

  Vec4.prototype = new Vec();

  setMethods('vec4', 4, vec4, Vec4);

  /**
   * @param {Float32Array|Array|Mat} x
   * @constructor
   */
  function Mat2(x) {
    var i;
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
    } else if (x instanceof Mat2) {
      this.arr = glMatrix.mat2.create();
      for (i = 0; i < 2 * 2; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat3) {
      this.arr = glMatrix.mat2.create();
      for (i = 0; i < 2 * 2; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat4) {
      this.arr = glMatrix.mat2.create();
      for (i = 0; i < 2 * 2; i++) {
        this.arr[i] = x[i];
      }
    } else {
      this.arr = glMatrix.mat2.create();
    }
  }

  Mat2.prototype = new Mat();

  setMatrixMethods('mat2', 3, mat2, Mat2);

  /**
   * @param {Float32Array|Array} x
   * @constructor
   */
  function Mat3(x) {
    var i;
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
    } else if (x instanceof Mat2) {
      this.arr = glMatrix.mat3.create();
      for (i = 0; i < 2 * 2; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat3) {
      this.arr = glMatrix.mat3.create();
      for (i = 0; i < 3 * 3; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat4) {
      this.arr = glMatrix.mat3.create();
      for (i = 0; i < 3 * 3; i++) {
        this.arr[i] = x[i];
      }
    } else {
      this.arr = glMatrix.mat3.create();
    }
  }

  Mat3.prototype = new Mat();

  setMatrixMethods('mat3', 3, mat3, Mat3);

  /**
   * @param {Float32Array|Array} x
   * @constructor
   */
  function Mat4(x) {
    var i;
    if (x instanceof GLMAT_ARRAY_TYPE) {
      this.arr = x;
    } else if (x instanceof Mat2) {
      this.arr = glMatrix.mat4.create();
      for (i = 0; i < 2 * 2; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat3) {
      this.arr = glMatrix.mat4.create();
      for (i = 0; i < 3 * 3; i++) {
        this.arr[i] = x[i];
      }
    } else if (x instanceof Mat4) {
      this.arr = glMatrix.mat4.create();
      for (i = 0; i < 4 * 4; i++) {
        this.arr[i] = x[i];
      }
    } else {
      this.arr = glMatrix.mat4.create();
    }
  }

  Mat4.prototype = new Mat();

  setMatrixMethods('mat4', 4, mat4, Mat4);

  function setMatrixMethods(name, num, mat, Mat) {

    var glMat = glMatrix[name];

    Mat.prototype.transpose = function () {
      return mat(glMat.transpose(mat().arr, this.arr));
    };

    Mat.prototype.invert = function () {
      return mat(glMat.invert(mat().arr, this.arr));
    };

    Mat.prototype.adjoint = function () {
      return mat(glMat.adjoint(mat().arr, this.arr));
    };

    Mat.prototype.determinant = function () {
      return glMat.determinant(this.arr);
    };

    Mat.prototype.multiply = function (other) {
      var temp = this;

      for (var i = 0; i < arguments.length; i++) {
        temp = matOperation.call(this, num, mat, Mat, glMat.mul, null, mul, arguments[i]);
      }

      return temp;
    };

    Mat.prototype.mul = Mat.prototype.multiply;

    Mat.prototype.translate = function (other) {
      return mat(glMat.translate(mat().arr, this.arr, other.arr));
    }
  }

  function setMethods(name, num, vec, Vec) {

    var glVec = glMatrix[name];

    Vec.prototype.add = function (other) {
      var temp = this;

      for (var i = 0; i < arguments.length; i++) {
        temp = vecOperation.call(temp, num, vec, Vec, null, glVec.add, add, arguments[i]);
      }

      return temp;
    };

    Vec.prototype.subract = function (other) {
      var temp = this;

      for (var i = 0; i < arguments.length; i++) {
        temp = vecOperation.call(temp, num, vec, Vec, null, glVec.sub, sub, arguments[i]);
      }

      return temp;
    };

    Vec.prototype.sub = Vec.prototype.subract;

    Vec.prototype.multiply = function (other) {
      var temp = this;

      for (var i = 0; i < arguments.length; i++) {
        temp = vecOperation.call(temp, num, vec, Vec, null, glVec.mul, mul, arguments[i]);
      }

      return temp;
    };

    Vec.prototype.mul = Vec.prototype.multiply;

    Vec.prototype.divide = function (other) {
      var temp = this;

      for (var i = 0; i < arguments.length; i++) {
        temp = vecOperation.call(temp, num, vec, Vec, null, glVec.div, div, arguments[i]);
      }

      return temp;
    };

    Vec.prototype.div = Vec.prototype.divide;

    Vec.prototype.min = function (other) {
      return vec(glVec.min(vec().arr, this.arr, other.arr));
    };

    Vec.prototype.max = function (other) {
      return vec(glVec.max(vec().arr, this.arr, other.arr));
    };

    Vec.prototype.scale = function (factor) {
      return vec(glVec.scale(vec().arr, this.arr, factor));
    };

    Vec.prototype.scaleAndAdd = function (other, factor) {
      return vec(glVec.scaleAndAdd(vec().arr, this.arr, other.arr, factor));
    };

    Vec.prototype.distance = function (other) {
      return glVec.distance(this.arr, other.arr);
    };

    Vec.prototype.dist = Vec.prototype.distance;

    Vec.prototype.squaredDistance = function (other) {
      return glVec.squaredDistance(this.arr, other.arr);
    };

    Vec.prototype.sqrDist = Vec.prototype.squaredDistance;

    Vec.prototype.length = function () {
      return glVec.length(this.arr);
    };

    Vec.prototype.len = Vec.prototype.length;

    Vec.prototype.squaredLength = function () {
      return glVec.squaredLength(this.arr);
    };

    Vec.prototype.sqrLen = Vec.prototype.squaredLength;

    Vec.prototype.negate = function () {
      return vec(glVec.negate(vec().arr, this.arr));
    };

    Vec.prototype.normalize = function () {
      return vec(glVec.normalize(vec().arr, this.arr));
    };

    Vec.prototype.dot = function (other) {
      return glVec.dot(this.arr, other.arr);
    };

    Vec.prototype.cross = function (other) {
      return vec(glVec.cross(vec().arr, this.arr, other.arr));
    };

    Vec.prototype.lerp = function (other, t) {
      return vec(glVec.lerp(vec().arr, this.arr, other.arr, t));
    };

    Vec.prototype.toString = function () {
      return glVec.str(this.arr);
    };

    Vec.prototype.clone = function () {
      return vec(glVec.clone(this.arr));
    };

    Vec.prototype.str = Vec.prototype.toString;
  }

  /**
   * @param x
   * @param y
   * @returns {Vec2}
   */
  function vec2(x, y) {
    if (!x) x = 0;
    if (!y) y = 0;
    return new Vec2(x, y);
  }

  /**
   * @param x
   * @param y
   * @param z
   * @returns {Vec3}
   */
  function vec3(x, y, z) {
    if (!x) x = 0;
    if (!y) y = 0;
    if (!z) z = 0;
    return new Vec3(x, y, z);
  }

  /**
   * @param x
   * @param y
   * @param z
   * @param w
   * @returns {Vec4}
   */
  function vec4(x, y, z, w) {
    if (!x) x = 0;
    if (!y) y = 0;
    if (!z) z = 0;
    if (!w) w = 0;
    return new Vec4(x, y, z, w);
  }

  /**
   * @param {Float32Array|Array} x
   * @returns {Mat2}
   */
  function mat2(x) {
    return new Mat2(x);
  }

  /**
   * @param {Float32Array|Array} x
   * @returns {Mat2}
   */
  function mat3(x) {
    return new Mat2(x);
  }

  /**
   * @param {Float32Array|Array} x
   * @returns {Mat4}
   */
  function mat4(x) {
    return new Mat4(x);
  }

  var glm = {

    /**
     * @param {Vec3} eye
     * @param {Vec3} center
     * @param {Vec3} up
     * @returns {Mat4}
     */
    lookAt: function (eye, center, up) {
      return mat4(glMatrix.mat4.lookAt(mat4().arr, eye.arr, center.arr, up.arr));
    },

    /**
     * @param {Number} fovy - In fucking degrees TODO: GLM_FORCE_RADIANS
     * @param {Number} aspect
     * @param {Number} near
     * @param {Number} far
     * @returns {Mat4}
     */
    perspective: function(fovy, aspect, near, far) {
      return mat4(glMatrix.mat4.perspective(mat4().arr, fovy * Math.PI / 180, aspect, near, far));
    },

    /**
     * 
     * @param mat
     * @param degree
     * @param axis
     * @returns {Mat4}
     */
    rotate: function(mat, degree, axis) {
      return mat4(glMatrix.mat4.rotate(mat4().arr, mat.arr, degree * Math.PI/ 180, axis.arr));
    },

    /**
     * @param {Vec|Mat} entity
     * @returns {Float32Array|Array}
     */
    valuePtr: function (entity) {
      if (entity && entity.arr) return entity.arr;
      throw new Error("Can't call valuePtr for other than Mat or Vec");
    }
  };

  var __exports = glm;
  __exports.vec2 = vec2;
  __exports.vec3 = vec3;
  __exports.vec4 = vec4;
  __exports.mat2 = mat2;
  __exports.mat3 = mat3;
  __exports.mat4 = mat4;
  return __exports;

});