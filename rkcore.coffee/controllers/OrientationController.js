
(function() {
  var OrientationController, exports, _base;

  OrientationController = (function() {

    OrientationController.isCompatible = function() {
      return 'DeviceOrientationEvent' in window;
    };
    function OrientationController(dom, registerTouch, touchCallback) {
      var _this = this;
      this.dom = dom;
      this.registerTouch = registerTouch != null ? registerTouch : true;
      this.touchCallback = touchCallback != null ? touchCallback : null;
      this.active = true;
      this.alpha = 0.0;
      this.beta = 0.0;
      this.gamma = 0.0;
      this.dalpha = null;
      this.dbeta = null;
      this.dgamma = null;
      this.touches = null;
      window.addEventListener('deviceorientation', (function(e) {
        return _this.orientationChange(e);
      }), false);
      if (this.registerTouch) {
        this.dom.addEventListener('touchstart', (function(e) {
          return _this.touchStart(e);
        }), false);
        this.dom.addEventListener('touchend', (function(e) {
          return _this.touchEnd(e);
        }), false);
      }
    }

    OrientationController.prototype.orientationChange = function(event) {
      if (!this.active) {
        return;
      }
      if (this.dalpha === null) {
        console.log("calbrate", event.beta);
        this.dalpha = event.alpha;
        this.dbeta = event.beta;
        this.dgamma = event.gamma;
      }
      this.alpha = event.alpha - this.dalpha;
      this.beta = event.beta - this.dbeta;
      this.gamma = event.gamma - this.dgamma;
      return false;
    };
    OrientationController.prototype.touchStart = function(event) {
      var touch, _i, _len, _ref;
      if (!this.active) {
        return;
      }
      _ref = event.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (typeof this.touchCallback === "function") {
          this.touchCallback(true, touch, event);
        }
      }
      this.touches = event.touches;
      return false;
    };
    OrientationController.prototype.touchEnd = function(event) {
      var touch, _i, _len, _ref;
      if (!this.active) {
        return;
      }
      _ref = event.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (typeof this.touchCallback === "function") {
          this.touchCallback(true, touch, event);
        }
      }
      this.touches = event.touches;
      return false;
    };

    return OrientationController;

  })();

  exports = exports != null ? exports : this;

  exports.bkcore || (exports.bkcore = {});

  (_base = exports.bkcore).controllers || (_base.controllers = {});

  exports.bkcore.controllers.OrientationController = OrientationController;

}).call(this);
