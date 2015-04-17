define(['exec/events', 'core/lang', 'core/utils'], function (events, lang, utils) {
        'use strict';

        function found() {
            events.trigger('term:start');
        }

        function notFound(locale) {
            /*jshint validthis:true */
            var o = {};
            o.out = lang.getSysMsg('cmd.bsh', {msg: 'locale:' + utils.DOUBLE_SPACE + locale + ':' + utils.DOUBLE_SPACE}).bsh + lang.getSysMsg('cmd.notFound').notFound;
            this._buffer.push(JST['app/scripts/templates/out.ejs'](o));
            o.out = lang.getSysMsg('cmd.help', {msg: 'locale'}).help;
            this._buffer.push(JST['app/scripts/templates/out.ejs'](o));
            events.trigger('term:html', this._buffer.join(''));
            events.trigger('term:shell');
        }
        // todo: falta hacer locale --help
        function Locale() {
            this._name = 'locale';
        }

        Locale.prototype.run = function (locale) {
            this._buffer = [];
            if (locale.length > 0) {
                lang.set(locale[0]);
            } else {
                // todo: mostrar actual locale
                events.trigger('term:shell');
            }
        };

        Locale.prototype.listenTo = function () {
            events.on('locale:notFound', notFound, this);
            events.on('locale:found', found);
        };

        Locale.prototype.stopListening = function () {
            events.off('locale:notFound', notFound);
            events.off('locale:notFound', found);
        };

        Locale.prototype.getName = function () {
            return this._name;
        };

        return new Locale();
    }
)
;