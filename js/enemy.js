var Enemy = function (parent) {
	'use strict';

	var svgns = 'http://www.w3.org/2000/svg',
		circle = document.createElementNS(svgns, 'circle'),
		radius = 20,
		position = [250, 250],
		maxSpeed = 250,
		direction = [0, 0],
		velocity = [0, 0],
		color = '';

	return {
		main: (function () {
			circle.setAttribute('r', radius);
			circle.setAttribute('cx', position[0]);
			circle.setAttribute('cy', position[1]);
			circle.setAttribute('fill', 'green');
			parent.appendChild(circle);
		}()),

		getPosition: function () {return position; },
		setPosition: function (x, y) {
			position = [x, y];
			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
		},

		getRadius: function () {return radius; },
		setRadius: function (r) {
			radius = r;
			circle.setAttribute('r', radius);
		},

		getMaxSpeed: function () {return maxSpeed; },
		setMaxSpeed: function (speed) {
			maxSpeed = speed;
		},

		getDirection: function () {return direction; },
		setDirection: function (dx, dy) {
			direction = [dx, dy];
			this.setVelocity();
		},

		getVelocity: function () {return velocity; },
		setVelocity: function () {
			var unit = Math.sqrt(Math.pow(this.getDirection()[0], 2) + Math.pow(this.getDirection()[1], 2)),
				vx = 0,
				vy = 0;

			if (unit !== 0) {
				vx = this.getDirection()[0] / unit * this.getMaxSpeed();
				vy = this.getDirection()[1] / unit * this.getMaxSpeed();
			}

			velocity = [vx, vy];
		},

		getColor: function () {return color; },
		setColor: function (hue) {
			color = hue;
			circle.setAttribute('fill', color);
		},

		move: function (progress) {
			this.setPosition(this.getPosition()[0] + (this.getVelocity()[0] * progress / 1000), this.getPosition()[1] + (this.getVelocity()[1] * progress / 1000));
			Collision.bound(position[0], position[1], velocity[0], velocity[1], radius, document.getElementById('GG-gameScreen').clientWidth, document.getElementById('GG-gameScreen').clientHeight, this.collideWithWall.bind(this));
//			Collision.boundedPolygon(position[0], position[1], velocity[0], velocity[1], radius, [[0, 0], [setup.width, 0], [setup.width, setup.height], [0, setup.height], [0, 0]], this.collideWithWall.bind(this));
		},

//		collideWithWall: function (posVector) {
//			var v = posVector;
//
//			console.log(v);
//
//			if (v[0] === 0) {
//				this.setDirection(this.getDirection()[0], -this.getDirection()[1]);
//			} else if (v[1] === 0) {
//				this.setDirection(-this.getDirection()[0], this.getDirection()[1]);
//			}
//		},

		collideWithWall: function (x, y, dx, dy) {
			x = x || this.getPosition()[0];
			y = y || this.getPosition()[1];
			dx = dx * this.getDirection()[0];
			dy = dy * this.getDirection()[1];

			this.setPosition(x, y);
			this.setDirection(dx, dy);
		},

		selfDestruct: function () {
			var screen = document.getElementById('GG-gameScreen'),
				i = 0;

			for (i = 0; i < screen.childNodes.length; i += 1) {
				if (screen.childNodes[i] === circle) {
//					console.log('That\'s the one!');
					screen.removeChild(screen.childNodes[i]);
					break;
				}
			}
		}
	};
};

var Unit = {
	create: function (unit, number) {
		'use strict';

		var i = 0,
			quantity = number || 1,
			enemy = {};

		for (i = 0; i < quantity; i += 1) {
			enemy = new Enemy(document.getElementById('GG-gameScreen'));
			enemy.setRadius(unit.radius());
			enemy.setPosition(unit.position(enemy.getRadius())[0], unit.position(enemy.getRadius())[1]);
			enemy.setColor(unit.color());
			enemy.setMaxSpeed(unit.maxSpeed(enemy.getRadius()));
			enemy.setDirection(unit.direction()[0], unit.direction()[1]);
			anim.addObject(enemy);
		}
	},

	reaper: {
		radius: function () {'use strict'; return 36 - Math.random() * 24; },
		position: function (radius) {'use strict'; return [Math.random() * (document.getElementById('GG-gameScreen').clientWidth - (2 * radius)) + radius, Math.random() * (document.getElementById('GG-gameScreen').clientHeight - (2 * radius)) + radius]; },
		color: function () {'use strict'; return 'rgb(0, 0, 0)'; },
		maxSpeed: function (radius) {'use strict'; return (250 - Math.random() * 225) / (radius / 2); },
//		direction: function () {'use strict'; return [(Math.random() - Math.random()), (Math.random() - Math.random())]; }
		direction: function () {'use strict'; return [0, 0]; }
	}
};

var Action = {
};

var Behavior = {
	speedBoost: function () {
		'use strict';

		var start = new Date(),
			multiplier = 5,
			originalSpeed = this.getMaxSpeed();

		this.setMaxSpeed(multiplier * this.getMaxSpeed());

		setTimeout(function () {
			this.setMaxSpeed(originalSpeed);
			this.speedBoost = null;
		}.bind(this), 2000);
	}
};
