
"use strict";

function TimeController(fn, context){
  this.timerId = null;
  this.fn = fn; 
  this.context = context;
  return this;
}

TimeController.prototype.throttle = function throttle(ms) {
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

TimeController.prototype.immediate = function immediate(ms) {
	var self = this;
	self.timeoutID = null;
	var safe = true;

	return function() {
		var args = arguments;

		if (safe) {
			self.fn.call(self.context, args);
			safe = false;
		}	

		clearTimeout(self.timeoutID);
		self.timeoutID = setTimeout(function() {
			safe = true;
		}, ms);
	};
};

TimeController.prototype.debounce = function debounce(ms) {
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
    module.exports = TimeController;
} else {
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return TimeController;
        });
    } else {
        window.TimeController = TimeController;
    }
}
