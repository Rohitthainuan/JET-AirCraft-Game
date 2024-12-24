
(function() {
  var Timer, exports;

  Timer = (function() {
    function Timer() {
      this.time = {
        start: 0,
        current: 0,
        previous: 0,
        elapsed: 0,
        delta: 0
      };
      this.active = false;
    }
    Timer.prototype.start = function() {
      var now;
      now = (new Date).getTime();
      this.time.start = now;
      this.time.current = now;
      this.time.previous = now;
      this.time.elapsed = 0;
      this.time.delta = 0;
      return this.active = true;
    };
    Timer.prototype.pause = function(doPause) {
      return this.active = !doPause;
    };
    Timer.prototype.update = function() {
      var now;
      if (!this.active) {
        return;
      }
      now = (new Date).getTime();
      this.time.current = now;
      this.time.elapsed = this.time.current - this.time.start;
      this.time.delta = now - this.time.previous;
      return this.time.previous = now;
    };
    Timer.prototype.getElapsedTime = function() {
      return this.constructor.msToTime(this.time.elapsed);
    };
    Timer.msToTime = function(t) {
      var h, m, ms, s;
      ms = t % 1000;
      s = Math.floor((t / 1000) % 60);
      m = Math.floor((t / 60000) % 60);
      h = Math.floor(t / 3600000);
      return {
        h: h,
        m: m,
        s: s,
        ms: ms,
        ms: ms
      };
    };
    Timer.msToTimeString = function(t) {
      var time;
      time = this.msToTime(t);
      time.h = this.zfill(time.h, 2);
      time.m = this.zfill(time.m, 2);
      time.s = this.zfill(time.s, 2);
      time.ms = this.zfill(time.ms, 4);
      return time;
    };
    Timer.zfill = function(num, size) {
      var len;
      len = size - num.toString().length;
      if (len > 0) {
        return new Array(len + 1).join('0') + num;
      } else {
        return num.toString();
      }
    };

    return Timer;

  })();
  exports = exports != null ? exports : this;

  exports.bkcore || (exports.bkcore = {});

  exports.bkcore.Timer = Timer;

}).call(this);
