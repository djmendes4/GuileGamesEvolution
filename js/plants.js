/*jslint devel: true */

var Plant = function (parent) {
	'use strict';

	var svgns = 'http://www.w3.org/2000/svg',
		xlinkns = 'http://www.w3.org/1999/xlink',
		image = {
			element: document.createElementNS(svgns, 'image'),
			x: 0,
			y: 0,
			height: 0,
			width: 0,
			link: 'dd'
		},
		collisionBox = {
			element: document.createElementNS(svgns, 'rect'),
			x: 0,
			y: 0,
			width: 80,
			height: 80,
			color: {
				red: 0,
				green: 0,
				blue: 255,
				opacity: 1.0
			},
			flags: ['player']
		},
		text = {
			element: document.createElementNS(svgns, 'text'),
			textNode: document.createTextNode(''),
			x: 26.5,
			y: 48.5
		},
		group = {
			element: document.createElementNS(svgns, 'g'),
			x: Math.random() * (parent.clientWidth - collisionBox.width),
			y: Math.random() * (parent.clientHeight - collisionBox.height)
		},
		maxSpeed = 0,
		direction = [0, 0],
		velocity = [0, 0],
		progress = 0,
		maturityRateFactor = 1,
		maturityRate = (100 / 60) * maturityRateFactor;

	return {
		main: (function () {
			collisionBox.element.setAttribute('x', collisionBox.x);
			collisionBox.element.setAttribute('y', collisionBox.y);
			collisionBox.element.setAttribute('width', collisionBox.width);
			collisionBox.element.setAttribute('height', collisionBox.height);
			collisionBox.element.setAttribute('fill', 'rgba(' + collisionBox.color.red + ',' + collisionBox.color.green + ',' + collisionBox.color.blue + ',' + collisionBox.color.opacity + ')');

			var test = document.createElementNS(svgns, 'svg');

			image.element.setAttribute('x', image.x);
			image.element.setAttribute('y', image.y);
			image.element.setAttribute('width', image.width);
			image.element.setAttribute('height', image.height);
			image.element.setAttribute('xlink:href', image.link);

			text.element.setAttribute('x', text.x);
			text.element.setAttribute('y', text.y);
			text.element.appendChild(text.textNode);

			group.element.setAttribute('transform', 'translate(' + group.x + ',' + group.y + ')');

			test.appendChild(image.element);
			group.element.appendChild(test);
			group.element.appendChild(collisionBox.element);
			group.element.appendChild(text.element);
			parent.appendChild(group.element);
		}()),

		getPosition: function () {return [group.x, group.y]; },
		setPosition: function (x, y) {
			group.x = x;
			group.y = y;
			group.element.setAttribute('transform', 'translate(' + group.x + ',' + group.y + ')');
		},

		collisionBox: {
			getWidth: function () {return collisionBox.width; },
			setWidth: function (width) {
				collisionBox.width = width;
				collisionBox.element.setAttribute('width', collisionBox.width);
			},

			getHeight: function () {return collisionBox.height; },
			setHeight: function (height) {
				collisionBox.height = height;
				collisionBox.element.setAttribute('height', collisionBox.height);
			},

			getColor: function () {return collisionBox.color; },
			setColor: function (r, g, b, a) {
				r = r !== null ? Math.round(r) : this.getColor().red;
				g = g !== null ? Math.round(g) : this.getColor().green;
				b = b !== null ? Math.round(b) : this.getColor().blue;
				a = a !== null ? a.toFixed(3) : this.getColor().opacity;

				collisionBox.color = {red: r, green: g, blue: b, opacity: a };
				collisionBox.element.setAttribute('fill', 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')');
			}
		},

		image: {
			getLink: function () {return image.link; },
			setLink: function (link) {
				image.link = link;
				console.log(link);
				image.element.setAttributeNS(xlinkns, 'href', image.link);
			},

			getWidth: function () {return image.width; },
			setWidth: function (width) {
				image.width = width;
				image.element.setAttribute('width', image.width);
			},

			getHeight: function () {return image.height; },
			setHeight: function (height) {
				image.height = height;
				image.element.setAttribute('height', image.height);
			}
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

		getProgress: function () {return progress; },
		setProgress: function (percent) {
			progress = percent;
			text.textNode.nodeValue = progress.toFixed(1) + '%';
		},

		getMaturityRate: function () {return maturityRate; },
		setMaturityRate: function (rate) {
			maturityRate = rate;
		},

		getMaturityRateFactor: function () {return maturityRateFactor; },
		setMaturityRateFactor: function (factor) {
			maturityRateFactor = factor;
		},

		getCollisionBox: function () {return collisionBox; },

		update: function (progress) {
			var percent = this.getMaturityRate() * this.getMaturityRateFactor() * (progress / 1000);

			if (this.getProgress() + percent < 100) {
				this.setProgress(this.getProgress() + percent);
				this.collisionBox.setColor(null, null, null, (this.getProgress() / 100));
			} else {
				this.setProgress(100);
				this.collisionBox.setColor(null, null, null, 1.0);
			}
		}
	};
};

var Garden = {
	generate: function (plant) {
		'use strict';

		var i, j, field,
			rows = 2,
			columns = 3;

		for (i = 0; i < columns; i += 1) {
			for (j = 0; j < rows; j += 1) {
				field = new Plant(document.getElementById('GG-gameScreen'));
				field.collisionBox.setWidth(plant.collisionBox.width());
				field.collisionBox.setHeight(plant.collisionBox.height());
				field.collisionBox.setColor(plant.collisionBox.color().red, plant.collisionBox.color().green, plant.collisionBox.color().blue, plant.collisionBox.color().opacity);
				field.setPosition(plant.position()[0] + ((field.collisionBox.getWidth() + 20) * i), plant.position()[1] + ((field.collisionBox.getHeight() + 20) * j));
				field.setMaturityRate(plant.maturityRate());
				field.setProgress(plant.progress());

				field.image.setWidth(plant.image.width());
				field.image.setHeight(plant.image.height());
				field.image.setLink(plant.image.link());

				anim.addObject(field);
				cns.addObjectToGroup(field, cns.plants);
			}
		}
	},

	tomato: {
		collisionBox: {
			width: function () {'use strict'; return 80; },
			height: function () {'use strict'; return 80; },
			color: function () {'use strict'; return {red: 0, green: 180, blue: 0, opacity: 0}; }
		},
		image: {
			width: function () {'use strict'; return '82px'; },
			height: function () {'use strict'; return '82px'; },
			link: function () {'use strict'; return './../assets/earth_tile.png'; },
			position: function () {'use strict'; return [-41, -41]; }
		},
		position: function () {'use strict'; return [840 - (this.collisionBox.width() / 2), 440 - (this.collisionBox.height() / 2)]; },
		progress: function () {'use strict'; return 0; },
		maturityRate: function () {'use strict'; return (100 / 1800); }
	}
};

var Abilities = {
	add: function (owner, ability) {
		'use strict';

		var newAbility = new ability();
		newAbility.setCaster(owner);
		owner[newAbility.getName()] = newAbility;
	},

	suffuseLife: function () {
		'use strict';

		var name = 'suffuseLife',
			caster = {},
			cooldown = 5,
			cooldownStart = new Date() - this.cooldown,
			range = 200,
			depletionTarget = null,
			suffuseTarget = null;

		return {
			getName: function () {return name; },
			setName: function (text) {
				name = text;
			},

			getCaster: function () {return caster; },
			setCaster: function (owner) {
				caster = owner;
			},

			getCooldown: function () {return cooldown; },
			setCooldown: function (time) {
				cooldown = time;
			},

			getCooldownStart: function () {return cooldownStart; },
			setCooldownStart: function (date) {
				cooldownStart = date;
			},

			getRange: function () {return range; },
			setRange: function (distance) {
				range = distance;
			},

			getDepletionTarget: function () {return depletionTarget; },
			setDepletionTarget: function (target) {
				depletionTarget = target;
			},

			getSuffuseTarget: function () {return suffuseTarget; },
			setSuffuseTarget: function (target) {
				suffuseTarget = target;
			},

			cast: function () {
				if (this.getCooldownStart() === null) {
					this.setCooldownStart(new Date() - this.getCooldown());
				}

				if (!this.isOnCooldown()) {
					console.log('Ability has been cast');
					var i = 0;

					for (i = 0; i < cns.plants.length; i += 1) {
						if (!this.isOutOfRange(caster.getPosition(), cns.plants[i].getPosition())) {
							cns.plants[i].getCollisionBox().element.addEventListener('click', caster.suffuseLife.selectDepletionTarget);
							cns.plants[i].getCollisionBox().element.setAttribute('stroke', 'black');
						}
					}
				}
			},

			isOnCooldown: function () {
				var currentDate = new Date();

				if (((currentDate - this.getCooldownStart()) / 1000) < this.getCooldown()) {
					console.log('The ability has been on cooldown for: ' + ((currentDate - this.getCooldownStart()) / 1000) + 'seconds');
					return true;
				} else {
					console.log('The ability is off cooldown');
					this.setCooldownStart(currentDate);
					return false;
				}
			},

			isOutOfRange: function (t1, t2) {
				var target1 = t1 || caster.getPosition(),
					target2 = t2 || this.getDepletionTarget().getPosition(),
					distance = [target2[0] - target1[0], target2[1] - target1[1]];

				console.log(target1);
				console.log(target2);

				if (distance[0] * distance[0] + distance[1] * distance[1] <= this.getRange() * this.getRange()) {
					return false;
				} else {
					return true;
				}
			},

			selectDepletionTarget: function (event) {
				var i = 0;

				for (i = 0; i < cns.plants.length; i += 1) {
					if (cns.plants[i].getCollisionBox().element === event.target) {
						caster.suffuseLife.setDepletionTarget(cns.plants[i]);
						console.log(caster.suffuseLife.getDepletionTarget());
						caster.suffuseLife.getDepletionTarget().getCollisionBox().element.setAttribute('stroke', 'red');
					}
				}

				for (i = 0; i < cns.plants.length; i += 1) {
					cns.plants[i].getCollisionBox().element.removeEventListener('click', caster.suffuseLife.selectDepletionTarget);
					if (!caster.suffuseLife.isOutOfRange(caster.suffuseLife.getDepletionTarget().getPosition(), cns.plants[i].getPosition()) && cns.plants[i] !== caster.suffuseLife.getDepletionTarget()) {
						cns.plants[i].getCollisionBox().element.addEventListener('click', caster.suffuseLife.selectSuffuseTarget);
						cns.plants[i].getCollisionBox().element.setAttribute('stroke', 'blue');
					}
				}
			},

			selectSuffuseTarget: function (event) {
				var i = 0;

				for (i = 0; i < cns.plants.length; i += 1) {
					if (cns.plants[i].getCollisionBox().element === event.target) {
						caster.suffuseLife.setSuffuseTarget(cns.plants[i]);
						console.log(caster.suffuseLife.getSuffuseTarget());
					} else if (cns.plants[i] !== caster.suffuseLife.getDepletionTarget()) {
						cns.plants[i].getCollisionBox().element.setAttribute('stroke', 'none');
					}
					cns.plants[i].getCollisionBox().element.removeEventListener('click', caster.suffuseLife.selectSuffuseTarget);
				}

				caster.suffuseLife.suffusion(caster.suffuseLife.getDepletionTarget(), caster.suffuseLife.getSuffuseTarget());
			},

			suffusion: function (deplete, suffuse) {
//				var depletedAmount = deplete.getProgress() / deplete.getMaturityRate(),
//					currentAmount = suffuse.getProgress() / suffuse.getMaturityRate();
//
//				deplete.setProgress(0);
//				suffuse.setProgress((currentAmount + depletedAmount) * suffuse.getMaturityRate());

				suffuse.setMaturityRateFactor(2);
				deplete.setMaturityRateFactor(0);
			}
		};
	},

	speedBoost: function () {
		'use strict';

		var name = 'speedBoost',
			caster = {},
			cooldown = 2000,
			cooldownStart = new Date() - this.cooldown,
			speed = 1,
			speedMultiplier = 2;

		return {
			getName: function () {return name; },
			setName: function (text) {
				name = text;
			},

			getCaster: function () {return caster; },
			setCaster: function (owner) {
				caster = owner;
			},

			getCooldown: function () {return cooldown; },
			setCooldown: function (time) {
				cooldown = time;
			},

			getCooldownStart: function () {return cooldownStart; },
			setCooldownStart: function (date) {
				cooldownStart = date;
			},

			getSpeed: function () {return speed; },
			setSpeed: function (rate) {
				speed = rate;
			},

			cast: function () {
				if (this.getCooldownStart() === null) {
					this.setCooldownStart(new Date() - this.getCooldown());
				}

				if (!this.isOnCooldown()) {
					console.log(this.getName() + ' has been cast!');
					this.setCooldownStart = new Date();
					caster.setSpeed(speedMultiplier * caster.getSpeed());

					setTimeout(function () {
						caster.setSpeed(caster.getSpeed() / speedMultiplier);
						caster.setVelocity();
					}.bind(this), cooldown);
				}
			},

			isOnCooldown: function () {
				var currentDate = new Date();

				if (((currentDate - this.getCooldownStart()) / 1000) < this.getCooldown()) {
					console.log('This ability is on cooldown.' + '\n' + 'Cooldown: ' + this.getCooldown() + ' (' + ((currentDate - this.getCooldownStart()) / 1000) + ' seconds remaining)');
					return true;
				} else {
					console.log('This ability is off cooldown');
					return false;
				}
			}
		};
	},

	teleport: function () {
		'use strict';

		var name = 'teleport',
			caster = {},
			cooldown = 10000,
			cooldownStart = new Date() - this.cooldown,
			distance = 0;

		return {
			getName: function () {return name; },
			setName: function (text) {
				name = text;
			},

			getCaster: function () {return caster; },
			setCaster: function (owner) {
				caster = owner;
			},

			getCooldown: function () {return cooldown; },
			setCooldown: function (time) {
				cooldown = time;
			},

			getCooldownStart: function () {return cooldownStart; },
			setCooldownStart: function (date) {
				cooldownStart = date;
			},

			getDistance: function () {return distance; },
			setDistance: function (length) {
				distance = length;
			},

			cast: function () {
				if (this.getCooldownStart() === null) {
					this.setCooldownStart(new Date() - this.getCooldown());
				}

				if (!this.isOnCooldown()) {
					console.log(this.getName() + ' has been cast!');
					this.setCooldownStart = new Date();
					// In reality:
					// if ('distance from position to teleport location' is less than 'teleportation spell maximum distance') {teleport}
					// else {determine a unit vector, break into x & y components and multiply by the 'teleportation spell maximum distance'}
					caster.setPosition(300, 300);
				}
			},

			isOnCooldown: function () {
				var currentDate = new Date();

				if (((currentDate - this.getCooldownStart()) / 1000) < this.getCooldown()) {
					console.log('This ability is on cooldown.' + '\n' + 'Cooldown: ' + this.getCooldown() + ' (' + ((currentDate - this.getCooldownStart()) / 1000) + ' seconds remaining)');
					return true;
				} else {
					console.log('This ability is off cooldown');
					return false;
				}
			}
		};
	}
};
