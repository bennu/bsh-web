define(['exec/events'], function (events) {
    'use strict';
    function Clear() {
        this._name = 'clear';
    }

    Clear.prototype.run = function () {
        events.trigger('term:start');
    };

    Clear.prototype.getName = function () {
        return this._name;
    };

    return new Clear();
});