define(function () {
    'use strict';

    function setValue(input, value, nav) {
        if (value) {
            input.value = value;
        } else {
            input.value = nav._cmdTmp;
            nav._start = false;
        }
        var vLength = input.value.length * 2;
        window.setTimeout(function () {
            input.setSelectionRange(vLength, vLength);
        }, 0);
    }

    function Navigate() {
        this._history = [];
    }

    Navigate.prototype.up = function (input) {
        if (!this._start) {
            this._start = true;
            this._cmdTmp = input.value;
            this._index = this._history.length;
        }
        setValue(input, this._history[--this._index], this);
        return this;
    };

    Navigate.prototype.down = function (input) {
        if (this._start) {
            setValue(input, this._history[++this._index], this);
        }
        return this;
    };

    Navigate.prototype.setHistory = function (cmd) {
        this._history.push(cmd);
        this._start = false;
        return this;
    };

    return new Navigate();
});