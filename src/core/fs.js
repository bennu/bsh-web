define(['core/tree', 'core/utils', 'core/node', 'exec/events'], function (tree, utils, Node, events) {
    'use strict';

    function index(root, o) {
        for (var prop in o) {
            var obj = o[prop],
                node = new Node();

            node.type = obj;
            node.name = prop;
            node.path = (root.parent ? root.path + '/' + prop : '/' + prop);
            node.parent = root;
            node.childs = null;

            root.childs = root.childs || [];

            if (!root.childs.length) {
                root.childs.push(node);
            } else {
                root.childs.splice(utils.finder(root.childs, node.name, 'index'), 0, node);
            }

            if (obj instanceof Object) {
                node.type = 'folder';
                index(node, obj);
            }
        }
    }

    function search(paths, callback, context) {

        function fireEvent(path, node) {
            if (node) {
                if (callback) {
                    callback('found', node);
                }
                events.trigger('fs:found', node);
            } else {
                node = new Node();
                if (_.startsWith(path, '/')) {
                    node.name = utils.getName(path);
                    node.path = path;
                } else {
                    node.name = path;
                    node.path = (context._current.parent ? context._current.path + '/' + path : '/' + path);
                }
                node.parent = null;
                node.type = null;
                node.childs = null;
                node.ln = null;

                if (callback) {
                    callback('notFound', node);
                }
                events.trigger('fs:notFound', node);
            }
        }

        function getNode(path, childs) {
            var found = null;
            if (path === '/') {
                found = context._root;
            }

            path = _.filter(path.split('/'), function (path) {
                return path.length !== 0;
            });

            _.each(path, function (name) {
                if (name === '..') {
                    var parent = childs ? childs[0].parent : found ? found : context._root;
                    found = parent.parent ? parent.parent : context._root;
                    childs = found.childs;
                } else if (name === '.') {
                    found = childs[0].parent;
                    childs = found.childs;
                } else if (name === '-') {
                    found = context._prev;
                    childs = found.childs;
                } else {
                    if (!childs) {
                        return false;
                    }
                    found = utils.finder(childs, name);
                    childs = found ? found.childs : null;
                }

            });
            return found;
        }

        if (_.isEmpty(paths)) {
            fireEvent(context._current.path, context._current);
        } else if (_.isArray(paths)) {
            paths.sort(utils.sortByName);
            _.each(paths, function (path) {
                fireEvent(path, getNode(path, (path.indexOf('/') === 0) ? context._root.childs : context._current.childs));
            });
        } else if (_.isString(paths)) {
            fireEvent(paths, getNode(paths, (paths.indexOf('/') === 0) ? context._root.childs : context._current.childs));
        }
    }

    function Fs(tree) {
        this._root = new Node();

        this._root.name = '/';
        this._root.type = 'folder';
        this._root.path = '/';
        this._root.parent = null;

        this._current = this._root;
        this._prev = this._current;
        index(this._root, tree);
    }

    Fs.prototype.get = function (paths, callback) {
        search(paths, callback, this);
        events.trigger('fs:finalize');
        return this;
    };

    Fs.prototype.getCurrentNode = function () {
        return this._current;
    };

    Fs.prototype.setPath = function (path) {
        var self = this;
        search(path, function (event, node) {
            if (event === 'found' && node.type === 'folder') {
                self._prev = self._current;
                self._current = node;
            }
        }, this);
        events.trigger('fs:finalize');
        return this;
    };

    return new Fs(tree);
});