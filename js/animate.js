var Animate = function () {
	'use strict';

	var start = 0,
		previous = null,
		increment = 0,
		objects = [],
		frameCount = 0;

	return {
		addObject: function (object) {
			objects.push(object);
		},

		removeObject: function (object) {
			var i = 0;

			for (i = 0; i < objects.length; i += 1) {
				if (objects[i] === object) {
					objects.splice(i, 1);
				}
			}
		},

		step: function (timestamp) {
			var i = 0;

			if (!previous) {
				previous = timestamp;
				start = timestamp;
			}

			frameCount += 1;

			if ((timestamp - start) >= 1000) {
//				console.log('FPS: ' + Math.floor(frameCount * (timestamp - start) / 1000));
				frameCount = 0;
				start = timestamp;
			}

			increment = timestamp - previous;
			previous = timestamp;

			for (i = 0; i < objects.length; i += 1) {
				objects[i].update(increment);
			}

			window.requestAnimationFrame(this.step.bind(this));
		},

		startAnimation: function () {
			window.requestAnimationFrame(this.step.bind(this));
		},

		getObjects: function () {
			return objects;
		}
	};
};
