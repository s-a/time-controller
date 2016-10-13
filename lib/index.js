
"use strict";

function TimeControll(){
  this.timerId = null;
  return this;
}

TimeControll.prototype.throttle = function throttle(fn, ms, context) {
  var execute = true;
  return function() {
    var args = arguments;

    if (execute) {
      fn.call(context, args);

      execute = false;
      setTimeout(function() {
        execute = true;
      }, ms);
    }
  };
};

TimeControll.prototype.immediate = function immediate(fn, ms, context) {
  var execute = true;
  var self = this;
  return function() {
    var args = arguments;

    if (execute) {
      fn.call(context, args);
      execute = false;
    }

    clearTimeout(self.timerId);
    self.timerId = setTimeout(function() {
      execute = true;
    }, ms);
  };
};

TimeControll.prototype.debounce = function debounce(fn, ms, context) {
  var self = this;
  return function() {
    clearTimeout(self.timerId);

    var args = arguments;
    self.timerId = setTimeout(function() {
      fn.apply(context, args);
    }, ms);
  };
};



if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = TimeControll;
} else {
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return TimeControll;
        });
    } else {
        window.TimeControll = TimeControll;
    }
}
