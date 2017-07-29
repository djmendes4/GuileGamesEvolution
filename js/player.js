/*jslint devel: true */

var Player = function (parent) {
	'use strict';
	var svgns = 'http://www.w3.org/2000/svg',
		circle = document.createElementNS(svgns, 'circle'),
		collisionType = [Collision.boundary, Collision.circle],
		position = [250, 250],
		radius = 35,
		color = '',
		maxSpeed = 250,
		direction = [0, 0],
		velocity = [0, 0];

	return {
		main: (function () {
			circle.setAttribute('r', radius);
			circle.setAttribute('cx', position[0]);
			circle.setAttribute('cy', position[1]);
			circle.setAttribute('fill', 'green');
			parent.appendChild(circle);
		}()),

		setPosition: function (positionX, positionY) {
			position = [positionX, positionY];
			circle.setAttribute('cx', positionX);
			circle.setAttribute('cy', positionY);
		},

		getPosition: function () {
			return position;
		},

		setRadius: function (length) {
			radius = length;
			circle.setAttribute('r', radius);
		},

		getRadius: function () {
			return radius;
		},

		setDirection: function (factorX, factorY) {
			if (factorX !== null) {
				direction = [factorX, this.getDirection()[1]];
			} else if (factorY !== null) {
				direction = [this.getDirection()[0], factorY];
			}
		},

		getDirection: function () {
			return direction;
		},

		setVelocity: function () {
			var unit = Math.sqrt(Math.pow(this.getDirection()[0], 2) + Math.pow(this.getDirection()[1], 2)),
				vx = 0,
				vy = 0;

			if (unit !== 0) {
				vx = this.getDirection()[0] / unit * maxSpeed;
				vy = this.getDirection()[1] / unit * maxSpeed;
			}

			velocity = [vx, vy];
		},

		getVelocity: function () {
			return velocity;
		},

		setMaxSpeed: function (magnitude) {
			maxSpeed = magnitude;
		},

		getMaxSpeed: function () {
			return maxSpeed;
		},

		setColor: function (hue) {
			color = hue;
			circle.setAttribute('fill', color);
		},

		getCollisionType: function () {
			return collisionType;
		},

		resolveCollision: function (x, y, sign) {
			console.log(circle.getAttribute('fill'));

			var cx = this.getPosition()[0],
				cy = this.getPosition()[1],
				theta = Math.atan((y - cy) / (x - cx)),
				xStar = (sign * this.getRadius() * Math.cos(theta)) + x,
				yStar = (sign * this.getRadius() * Math.sin(theta)) + y;

//			console.log(cx + ', ' + cy + ' || ' + xStar + ', ' + yStar);
			this.setVelocity(0, 0);
			this.setPosition(xStar, yStar);
		},

		move: function (progress) {
			var i = 0;

			this.setPosition(this.getPosition()[0] + (this.getVelocity()[0] * progress / 1000), this.getPosition()[1] + (this.getVelocity()[1] * progress / 1000));
			Collision.boundary(this);
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
		},

		update: function (progress) {
			this.move(progress);
		}
	};
};
