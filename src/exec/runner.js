define(['exec/events', 'core/utils', 'core/lang', 'cmd/cd', 'cmd/clear', 'cmd/ls', 'cmd/pwd', 'cmd/locale'], function (events, utils, lang, cd, clear, ls, pwd, locale) {
    'use strict';

    function Runner() {
        this._commands = {};
    }

    Runner.prototype.add = function (command) {
        this._commands[command.getName()] = command;
        return this;
    };

    Runner.prototype.trigger = function (args) {
        if (args[0] !== '') {
            var cmd = this._commands[args[0]];
            if (cmd) {
                if (_.isFunction(cmd.listenTo)) {
                    cmd.listenTo();
                }
                cmd.run(_.slice(args, 1));
                if (_.isFunction(cmd.stopListening)) {
                    cmd.stopListening();
                }
            } else {
                var o = {};
                o.out = lang.getSysMsg('cmd.bsh', {msg: args[0]}).bsh + utils.DOUBLE_SPACE + lang.getSysMsg('cmd.command').command;
                events.trigger('term:jst', 'app/scripts/templates/out.ejs', o);
                events.trigger('term:shell');
            }
        } else {
            events.trigger('term:shell');
        }
        return this;
    };
    var runner = new Runner();

    runner.add(cd).add(clear).add(ls).add(pwd).add(locale);

    return runner;
});