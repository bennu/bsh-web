define(['exec/events', 'core/fs'], function (events, fs) {
    'use strict';
    function Pwd() {
        this._name = 'pwd';
    }

    Pwd.prototype.run = function () {
        var o = {out: fs.getCurrentNode().path};
        events.trigger('term:jst', 'app/scripts/templates/out.ejs', o);
        events.trigger('term:shell');
    };

    Pwd.prototype.getName = function () {
        return this._name;
    };
    return new Pwd();
});