/*jslint devel: true */

var Controller = function () {
	'use strict';

	var controlledPlayer = {},
		cursorX = 0,
		cursorY = 0,
		count = 0;

	return {
		main: function () {
			window.addEventListener('keydown', this, false);
			window.addEventListener('keyup', this, false);
			window.addEventListener('mousemove', this, false);
		},

		//NOTE: 'handleEvent' is a special function that is hard-coded to handle events.
		handleEvent: function (event) {
			switch (event.type) {
			case 'keydown':
				this.keyDownHandler(event);
				break;
			case 'keyup':
				this.keyUpHandler(event);
				break;
			case 'mousemove':
				this.mouseMoveHandler(event);
				break;
			}
		},

		keyDownHandler: function (event) {
//			console.log(event.keyCode);
			switch (event.keyCode) {
			case 87:
				controlledPlayer.setDirection(null, -1);
				break;
			case 83:
				controlledPlayer.setDirection(null, 1);
				break;
			case 65:
				controlledPlayer.setDirection(-1, null);
				break;
			case 68:
				controlledPlayer.setDirection(1, null);
				break;
			case 32:
				controlledPlayer.speedBoost.cast();
				break;
			case 49:
				controlledPlayer.suffuseLife.cast();
				break;
			case 50:
				controlledPlayer.teleport.cast();
				break;
			}
			controlledPlayer.setVelocity();
		},

		keyUpHandler: function (event) {
//			console.log(event.keyCode);
			switch (event.keyCode) {
			case 87:
			case 83:
				controlledPlayer.setDirection(null, 0);
				break;
			case 65:
			case 68:
				controlledPlayer.setDirection(0, null);
				break;
			}
			controlledPlayer.setVelocity();
		},

		mouseMoveHandler: function (event) {
			if (count < 25) {
				count += 1;
				console.log(count);
			} else {
				count = 0;
				console.log(count);
				window.removeEventListener('mousemove', this, false);
			}
		},

		attachToPlayer: function (player) {
			controlledPlayer = player;
		}
	};
};
