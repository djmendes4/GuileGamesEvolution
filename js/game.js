/*jslint devel: true */

var Setup = function () {
	'use strict';

	var container = document.createElement('section'),
		svgns = 'http://www.w3.org/2000/svg',
		svg = document.createElementNS(svgns, 'svg'),
		circle = document.createElementNS(svgns, 'circle');

	container.setAttribute('id', 'GG-gameContainer');
	document.getElementById('GuileGames').appendChild(container);

	svg.setAttribute('id', 'GG-gameScreen');
	svg.setAttribute('width', screen.width);
	svg.setAttribute('height', screen.height);
	container.appendChild(svg);

	this.width = document.getElementById('GG-gameScreen').clientWidth;
	this.height = document.getElementById('GG-gameScreen').clientHeight;
};
