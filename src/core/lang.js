define(['exec/events', 'lang/sys/en/sysMsg', 'lang/sys/es/sysMsg'], function (events, en, es) {
    'use strict';

    function replace(o, msg) {
        if (o && msg.indexOf('{{msg}}') > -1) {
            msg = msg.replace('{{msg}}', o.msg);
        }
        return msg;
    }

    function Lang() {
        this._locale = (navigator.language || navigator.userLanguage).split('-')[0];
        this._sysMsg = {};
    }

    Lang.prototype.add = function (locale) {
        this._sysMsg[locale.getName()] = locale;
        return this;
    };

    Lang.prototype.getSysMsg = function (key, o) {
        var msg = this._current || _.has(this._sysMsg, this._locale) ? this._sysMsg[this._locale] : this._sysMsg.en,
            jst = {};

        if (key.indexOf('.') > -1) {
            _.each(key.split('.'), function (prop) {
                msg = msg[prop];
                if (_.isString(msg)) {
                    jst[prop] = replace(o, msg);
                }
            });
        } else {
            jst[key] = replace(o, msg[key]);
        }

        return jst;
    };

    Lang.prototype.set = function (locale) {
        if (_.has(this._sysMsg, locale)) {
            this._current = this._sysMsg[locale];
            events.trigger('locale:found', locale);
        } else {
            events.trigger('locale:notFound', locale);
        }
        return this;
    };

    var lang = new Lang();
    lang.add(en).add(es);

    return lang;
});