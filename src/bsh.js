define([
    'core/term'
], function (term) {
    'use strict';

    function onLoad() {
        term.start();
    }

    if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('load', onLoad, false);
    }
    else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('onload', onLoad);
    }
});