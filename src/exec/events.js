define(function () {
    'use strict';

    function Events() {
        this._eventsMap = {};
    }

    Events.prototype.on = function (name, callback, context) {
        var events = this._eventsMap[name] || (this._eventsMap[name] = []);
        events.push({callback: callback, context: context || this});
        return this;
    };

    Events.prototype.off = function (name, callback, context) {
        var events, retain;
        if (!this._eventsMap) return this;
        if (events = this._eventsMap[name]) {
            this._eventsMap[name] = retain = [];
            _.each(events, function (event) {
                if ((callback && callback !== event.callback ) || (context && context !== event.context)) {
                    retain.push(event);
                }
            });
        }

        if (!retain.length) delete this._eventsMap[name];
        return this;
    };

    Events.prototype.trigger = function (name) {

        if (!this._eventsMap) return this;
        var args = _.slice(arguments, 1);

        _.each(this._eventsMap[name], function (event) {
            event.callback.apply(event.context, args);
        });
        return this;
    };

    return new Events();
});