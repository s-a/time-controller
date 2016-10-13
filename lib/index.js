
"use strict";

function TimeControll(fn, context){
  this.timerId = null;
  this.fn = fn; 
  this.context = context;
  return this;
}

TimeControll.prototype.throttle = function throttle(ms) {
  var self = this;
  var execute = true;
  return function() {
    var args = arguments;

    if (execute) {
      self.fn.call(self.context, args);

      execute = false;
      setTimeout(function() {
        execute = true;
      }, ms);
    }
  };
};

TimeControll.prototype.immediate = function immediate(ms) {
  var self = this;
  return function() {
    var args = arguments;

    clearTimeout(self.timerId);
    self.timerId = setTimeout(function() {
      self.fn.call(self.context, args);
    }, ms);
  };
};

TimeControll.prototype.debounce = function debounce(ms) {
  var self = this;
  return function() {
    clearTimeout(self.timerId);
    var args = arguments;
    self.timerId = setTimeout(function() {
      self.fn.apply(self.context, args);
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
