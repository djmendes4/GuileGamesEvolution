/*jslint devel: true */

var CNS = function () {
	'use strict';

	this.plants = [];

	this.addObjectToGroup = function (object, group) {
		group.push(object);
	};
};

var cns = new CNS();

var setup = new Setup();
var anim = new Animate();

var player1 = new Player(document.getElementById('GG-gameScreen'));
player1.setColor('green');

Abilities.add(player1, Abilities.suffuseLife);
//console.log(player1);
Abilities.add(player1, Abilities.speedBoost);
Abilities.add(player1, Abilities.teleport);
//console.log(player1);

var controller1 = new Controller();
controller1.main();
controller1.attachToPlayer(player1);

anim.startAnimation();
anim.addObject(player1);

plant1 = new Plant(document.getElementById('GG-gameScreen'));
plant1.setMaturityRate(100/10800);
plant1.setPosition(900, 300);
//plant1.getCollisionBox().element.setAttribute('stroke', 'black');

anim.addObject(plant1);
cns.addObjectToGroup(plant1, cns.plants);

Garden.generate(Garden.tomato);

//console.log(cns.plants);
