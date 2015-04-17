define(['exec/events', 'core/fs', 'core/lang', 'core/utils'], function (events, fs, lang, utils) {
    'use strict';
    function notFound(node) {
        /*jshint validthis:true */
        var o = {};
        o.out = lang.getSysMsg('cmd.bsh', {msg: 'cd:' + utils.DOUBLE_SPACE + node.path +':'+ utils.DOUBLE_SPACE}).bsh + lang.getSysMsg('cmd.cd.default').default;
        this._buffer.push(JST['app/scripts/templates/out.ejs'](o));
    }

    function finalize() {
        /*jshint validthis:true */
        events.trigger('term:html', this._buffer.join(''));
        events.trigger('term:shell');
    }

    function Cd() {
        this._name = 'cd';
    }

    Cd.prototype.run = function (paths) {
        this._buffer = [];
        if (paths.length > 0) {
            fs.setPath(paths[0]);
        } else {
            fs.setPath('/home/bsh');
        }
    };

    Cd.prototype.listenTo = function () {
        events.on('fs:notFound', notFound, this);
        events.on('fs:finalize', finalize, this);
    };

    Cd.prototype.stopListening = function () {
        events.off('fs:notFound', notFound);
        events.off('fs:finalize', finalize);
    };

    Cd.prototype.getName = function () {
        return this._name;
    };
    return new Cd();
});