define(['exec/events', 'core/fs', 'core/utils'], function (events, fs, utils) {
    'use strict';
    var ulOpen = '<ul class="fila">',
        ulClose = '</ul>';


    function lsSnippet(node, found, context) {
        var o = {};

        function ul(node) {
            if (node.type === 'folder' && node.childs != null) {
                context._buffer.push(ulOpen);
                context._buffer.push(render(node.childs));
                context._buffer.push(ulClose);
            } else if (node.type === 'file' || node.type === 'sh') {
                context._buffer.push(ulOpen);
                context._buffer.push(render(node));
                context._buffer.push(ulClose);
            }
        }

        function render(nodes) {
            var buffer = [];
            if (_.isArray(nodes)) {
                _.each(nodes, function (object) {
                    buffer.push(JST['app/scripts/templates/ls.ejs'](object));
                });
            } else {
                buffer.push(JST['app/scripts/templates/ls.ejs'](nodes));
            }
            return buffer.join('');
        }

        if (context._pathsLength-- > 1 && found) {
            o.out = node.path + ':';
            context._buffer.push(JST['app/scripts/templates/out.ejs'](o));
            ul(node);
            o.out = '<br>';
            context._buffer.push(JST['app/scripts/templates/out.ejs'](o));
        }
        else if (context._pathsLength <= 1 && found) {
            if (context._buffer.length) {
                o.out = node.path + ':';
                context._buffer.push(JST['app/scripts/templates/out.ejs'](o));
            }
            ul(node);
        }

        if (!found) {
            o.out = 'ls:' + utils.DOUBLE_SPACE + 'cannot access' + utils.DOUBLE_SPACE + node.path + ':' + utils.DOUBLE_SPACE + 'No such file or directory';
            context._notFoundBuffer.push(JST['app/scripts/templates/out.ejs'](o));
        }
    }

    function found(node) {
        /*jshint validthis:true */
        lsSnippet(node, true, this);
    }

    function notFound(node) {
        /*jshint validthis:true */
        lsSnippet(node, false, this);
    }

    function finalize() {
        /*jshint validthis:true */
        if (this._notFoundBuffer.length && this._buffer.length) {
            this._buffer = _.slice(this._buffer, 0, this._buffer.length - 1);
        }
        events.trigger('term:html', this._notFoundBuffer.join(''));
        events.trigger('term:html', this._buffer.join(''));
        events.trigger('term:shell');
    }

    function Ls() {
        this._name = 'ls';
    }

    Ls.prototype.run = function (paths) {
        this._buffer = [];
        this._notFoundBuffer = [];
        this._pathsLength = paths.length;
        fs.get(paths);
    };

    Ls.prototype.listenTo = function () {
        events.on('fs:found', found, this);
        events.on('fs:notFound', notFound, this);
        events.on('fs:finalize', finalize, this);
    };

    Ls.prototype.stopListening = function () {
        events.off('fs:found', found);
        events.off('fs:notFound', notFound);
        events.off('fs:finalize', finalize);
    };

    Ls.prototype.getName = function () {
        return this._name;
    };

    return new Ls();
});