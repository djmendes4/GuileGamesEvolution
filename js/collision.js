/*jslint devel: true */

var Collision = {
	boundary: function (circle) {
		'use strict';

		var width = document.getElementById('GG-gameScreen').clientWidth,
			height = document.getElementById('GG-gameScreen').clientHeight;

		if (circle.getPosition()[0] - circle.getRadius() <= 0) {
//			console.log('Collision with left wall');
			circle.setPosition(circle.getRadius(), circle.getPosition()[1]);
			circle.setDirection(0, null);
		} else if (circle.getPosition()[0] + circle.getRadius() >= width) {
//			console.log('Collision with right wall');
			circle.setPosition(width - circle.getRadius(), circle.getPosition()[1]);
			circle.setDirection(0, null);
		}

		if (circle.getPosition()[1] - circle.getRadius() <= 0) {
//			console.log('Collision with top wall');
			circle.setPosition(circle.getPosition()[0], circle.getRadius());
			circle.setDirection(null, 0);
		} else if (circle.getPosition()[1] + circle.getRadius() >= height) {
//			console.log('Collision with bottom wall');
			circle.setPosition(circle.getPosition()[0], height - circle.getRadius());
			circle.setDirection(null, 0);
		}
	},

	boundedPolygon: function (x, y, vx, vy, radius, points, callback) {
		'use strict';

		var lineCount = 0,
			v = [],
			r = [],
			d = [];

		for (lineCount = 0; lineCount < points.length - 1; lineCount += 1) {
			v = [points[lineCount + 1][1] - points[lineCount][1], points[lineCount + 1][0] - points[lineCount][0]];
			r = [points[lineCount][0] - x, points[lineCount][1] - y];
			d = Math.abs((v[0] * r[0]) + (v[1] * r[1])) / Math.sqrt((v[0] * v[0]) + (v[1] * v[1])) - radius;

			if (d * d < ((vx / 20) * (vx / 20)) + ((vy / 20) * (vy / 20))) {
//				console.log('Impending Collision');
				if (d <= 0) {
//					console.log('Actual Collision');
					callback(v);
				}
			}
		}
	},

	bound: function (x, y, vx, vy, r, width, height, callback) {
		'use strict';

		if (x - r < (-vx / 20) || x + r > (width - (vx / 20))) {
//			console.log('An object is about to collide with a wall');
			if (x - r <= 0) {
//				console.log('Collision with left wall');
				callback(r, null, -1, 1);
			} else if (x + r >= width) {
//				console.log('Collision with right wall');
				callback(width - r, null, -1, 1);
			}
		}

		if (y - r < (-vy / 20) || y + r > (height - (vy / 20))) {
//			console.log('An object is about to collide with a wall');
			if (y - r <= 0) {
//				console.log('Collision with top wall');
				callback(null, r, 1, -1);
			} else if (y + r >= height) {
//				console.log('Collision with bottom wall');
				callback(null, height - r, 1, -1);
			}
		}
	},

	circle: function (circle1, circle2) {
		'use strict';

		var c2x = circle2.getPosition()[0] - circle1.getPosition()[0],
			c1r = circle1.getRadius(),
			c2y = circle2.getPosition()[1] - circle1.getPosition()[1],
			c2r = circle2.getRadius(),
			midpointX = 0,
			midpointY = 0,
			sign = 1,
			massChange = 0,
			newRadius = 0;

		if ((c2x * c2x) + (c2y * c2y) <= (c1r + c2r) * (c1r + c2r)) {
//			console.log('Collision detected');

			midpointX = c2x * (c1r / (c1r + c2r)) + circle1.getPosition()[0];
			midpointY = c2y * (c1r / (c1r + c2r)) + circle1.getPosition()[1];
			sign = 1;

			if (c2x < 0 || (c2x === 0 && c2y < 0)) {
				sign = 1;
			} else {
				sign = -1;
			}

			if (c1r > c2r) {
				if (c2r < 3) {
					circle2.selfDestruct();
				} else {
					massChange = ((c2r * c2r) - ((c2r - (c2r / 50)) * (c2r - (c2r / 50))));
					newRadius = Math.sqrt((c1r * c1r) + massChange);
					circle2.setRadius(c2r - (c2r / 50));
					circle1.setRadius(newRadius);
				}
			} else if (c2r > c1r) {
				if (c1r < 3) {
					circle1.selfDestruct();
				} else {
					massChange = ((c1r * c1r) - ((c1r - (c1r / 50)) * (c1r - (c1r / 50))));
					newRadius = Math.sqrt((c2r * c2r) + massChange);
					circle1.setRadius(c1r - (c1r / 50));
					circle2.setRadius(newRadius);
				}
			}
		}
	}
};
