
(function() {
  var Utils, exports;

  Utils = (function() {
    function Utils() {}

    Utils.createNormalMaterial = function(opts) {
      var material, parameters, shader, shadername, uniforms, _ref, _ref1, _ref2, _ref3, _ref4;
      if (opts == null) {
        opts = {};
      }
      if ((_ref = opts.ambient) == null) {
        opts.ambient = 0x444444;
      }
      if ((_ref1 = opts.normalScale) == null) {
        opts.normalScale = 1.0;
      }
      if ((_ref2 = opts.reflectivity) == null) {
        opts.reflectivity = 0.9;
      }
      if ((_ref3 = opts.shininess) == null) {
        opts.shininess = 42;
      }
      if ((_ref4 = opts.metal) == null) {
        opts.metal = false;
      }
      shadername = opts.perPixel ? "normalV" : "normal";
      shader = bkcore.threejs.Shaders[shadername];
      uniforms = THREE.UniformsUtils.clone(shader.uniforms);
      uniforms["enableDiffuse"].value = true;
      uniforms["enableSpecular"].value = true;
      uniforms["enableReflection"].value = !!opts.cube;
      uniforms["tNormal"].texture = opts.normal;
      uniforms["tDiffuse"].texture = opts.diffuse;
      uniforms["tSpecular"].texture = opts.specular;
      uniforms["uAmbientColor"].value.setHex(opts.ambient);
      uniforms["uAmbientColor"].value.convertGammaToLinear();
      uniforms["uNormalScale"].value = opts.normalScale;
      if (opts.cube != null) {
        uniforms["tCube"].texture = opts.cube;
        uniforms["uReflectivity"].value = opts.reflectivity;
      }
      parameters = {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        lights: true,
        fog: false
      };
      material = new THREE.ShaderMaterial(parameters);
      material.perPixel = true;
      material.metal = opts.metal;
      return material;
    };
    Utils.projectOnScreen = function(object, camera) {
      var c, lPos, mat;
      mat = new THREE.Matrix4();
      mat.multiply(camera.matrixWorldInverse, object.matrixWorld);
      mat.multiply(camera.projectionMatrix, mat);
      c = mat.n44;
      lPos = new THREE.Vector3(mat.n14 / c, mat.n24 / c, mat.n34 / c);
      return lPos.multiplyScalar(0.5).addScalar(0.5);
    };
    Utils.URLParameters = null;

    Utils.getURLParameter = function(name) {
      var _this = this;
      if (!(this.URLParameters != null)) {
        this.URLParameters = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, val) {
          return _this.URLParameters[key] = val;
        });
      }
      return this.URLParameters[name];
    };
    Utils.getOffsetTop = function(obj) {
      var curtop;
      curtop = obj.offsetTop;
      if (obj.offsetParent) {
        while (obj = obj.offsetParent) {
          curtop += obj.offsetTop;
        }
      }
      return curtop;
    };
    Utils.scrollTo = function(id) {
      return window.scroll(0, this.getOffsetTop(document.getElementById(id)));
    };
    Utils.updateClass = function(id, cssclass, active) {
      var e;
      e = document.getElementById(id);
      if (e == null) {
        return;
      }
      if (active) {
        return e.classList.add(cssclass);
      } else {
        return e.classList.remove(cssclass);
      }
    };
    Utils.request = function(url, postData, callback, data) {
      var XMLHttpFactories, createXMLHTTPObject, i, method, qdata, req, val;
      XMLHttpFactories = [
        function() {
          return new XMLHttpRequest();
        }, function() {
          return new ActiveXObject("Msxml2.XMLHTTP");
        }, function() {
          return new ActiveXObject("Msxml3.XMLHTTP");
        }, function() {
          return new ActiveXObject("Microsoft.XMLHTTP");
        }
      ];
      createXMLHTTPObject = function() {
        var i, xmlhttp, _i, _ref;
        xmlhttp = false;
        for (i = _i = 0, _ref = XMLHttpFactories.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          try {
            xmlhttp = XMLHttpFactories[i]();
          } catch (e) {
            continue;
          }
          break;
        }
        return xmlhttp;
      };
      req = createXMLHTTPObject();
      if (req == null) {
        return;
      }
      method = postData != null ? "POST" : "GET";
      qdata = "o=bk";
      if (data != null) {
        for (i in data) {
          val = data[i];
          qdata += "&" + i + "=" + val;
          if (postData != null) {
            url += "?" + qdata;
          }
        }
      }
      req.open(method, url, true);
      if (postData != null) {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
      req.onreadystatechange = function() {
        if (req.readyState !== 4) {
          return;
        }
        if (!(req.status === 200 || req.status === 304)) {
          return;
        }
        return typeof callback === "function" ? callback(req) : void 0;
      };
      req.send(qdata);
      return req;
    };

    return Utils;

  })();
  exports = exports != null ? exports : this;

  exports.bkcore || (exports.bkcore = {});

  exports.bkcore.Utils = Utils;

}).call(this);
