define(['exec/runner', 'exec/events', 'core/utils', 'core/fs', 'core/lang', 'helper/navigate'], function (runner, events, utils, fs, lang, navigate) {
    'use strict';

    var el = window.document.getElementById('bsh'),
        prompt = {user: 'root', host: 'bennu'},
        container = window.document.createElement('div'),
        home = String.fromCharCode(126);

    el.className = 'wrapper';
    container.className = 'container';

    el.appendChild(container);

    function Term() {
        events.on('term:shell', this.shell, this);
        events.on('term:jst', this.outJST, this);
        events.on('term:html', this.outHTML, this);
        events.on('term:start', this.start, this);
    }

    Term.prototype.outJST = function (template, object) {
        container.insertAdjacentHTML('beforeEnd', JST[template](object));
        return this;
    };

    Term.prototype.outHTML = function (html) {
        container.insertAdjacentHTML('beforeEnd', html);
        return this;
    };

    Term.prototype.shell = function () {
        var cmd = window.document.getElementById('cmd'),
            currentFolder;

        if (cmd) {
            var span = window.document.createElement('span'),
                parentNode = cmd.parentNode;
            span.innerHTML = cmd.value.replace(/ /g, '\u00a0');

            parentNode.removeChild(cmd);
            parentNode.appendChild(span);
        }
        currentFolder = utils.getName(fs.getCurrentNode().path);

        if (_.startsWith(fs.getCurrentNode().path, '/home/bsh')) {
            prompt.currentFolder = home + (currentFolder !== 'bsh' ? currentFolder : '');
        }
        else {
            prompt.currentFolder = '/' + currentFolder;
        }

        this.outJST('app/scripts/templates/prompt.ejs', prompt);

        cmd = document.getElementById('cmd');
        cmd.focus();

        cmd.addEventListener('keydown', function (e) {

            var key = e.which || e.keyCode,
                args = cmd.value;

            if (key === 13) {
                if (args.trim()) {
                    navigate.setHistory(args);
                }
                runner.trigger(args.replace(/\s+/g, ' ').trim().split(' '));
            }
            if (key === 9) {
				e.preventDefault();
            }
            if (key === 38) {
                navigate.up(this);
            }
            if (key === 40) {
                navigate.down(this);
            }
        });
    };

    Term.prototype.start = function () {

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        this.outJST('app/scripts/templates/welcome.ejs', lang.getSysMsg('welcome')).shell();
    };

    return new Term();
});