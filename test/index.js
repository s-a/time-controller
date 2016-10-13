'use strict';

var assert = require('assert');
var TimeController = require('../lib');
var ContextObject = function(){
this.test = true;
return this;
}

describe('time-controller', function () {

	it('should execute debounced', function (done) {
		this.timeout(50);
		var contextObject = new ContextObject()
		var debouncedTimeController = new TimeController(function(){
			assert(true, this.test === true);
			done();
		}, contextObject).debounce(10);

		debouncedTimeController();
	}); 

	it('should execute throttled', function (done) {
		this.timeout(50);
		var contextObject = new ContextObject()
		var throttledTimeController = new TimeController(function(){
			assert(true, this.test === true);
			done();
		}, contextObject).throttle(10);

		throttledTimeController();
		throttledTimeController();
		throttledTimeController();
		throttledTimeController();
		throttledTimeController();
	});

	it('should execute immediate', function (done) {
		this.timeout(300);
		var contextObject = new ContextObject()
		var immediateTimeController = new TimeController(function(){
			assert(true, this.test === true);
			done();
		}, contextObject).immediate(100);

		immediateTimeController();
	});

});
