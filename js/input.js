/*jslint devel: true */

var Controller = function () {
	'use strict';

	var controlledPlayer = {};

	return {
		main: function () {
			window.addEventListener('keydown', this.keyDownHandler);
			window.addEventListener('keyup', this.keyUpHandler);
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
				if (controlledPlayer.speedBoost === null || controlledPlayer.speedBoost === undefined) {
					controlledPlayer.speedBoost = Abilities.speedBoost;
					controlledPlayer.speedBoost();
//					console.log('Speed Boost added');
//					console.log(controlledPlayer);
				}
				break;
			case 49:
				controlledPlayer.suffuseLife.cast();
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

		attachToPlayer: function (player) {
			controlledPlayer = player;
		}
	};
};
