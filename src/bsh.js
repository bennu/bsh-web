define([
    'core/term'
], function (term) {
	'use strict';

	function onLoad() {
		term.start();
	}

	function focus() {
		var cmd = document.getElementById("cmd");
		cmd.focus()
	};
	
	if (typeof window.addEventListener !== 'undefined') {
		window.addEventListener('load', onLoad, false);
		window.addEventListener('click', focus, false);
	} else if (typeof window.attachEvent !== 'undefined') {
		window.attachEvent('onload', onLoad);
		window.attachEvent('click', focus);
	}
});