define(function () {
    'use strict';

    function strCmp(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    }

    return {
        'getName': function (path) {
            return path.substring(path.lastIndexOf('/') + 1, path.length);
        },
        'strCmp': strCmp,
        'sortByName': function (a, b) {
            var nameA = a.name ? a.name : a,
                nameB = b.name ? b.name : b;

            return strCmp(nameA, nameB);
        },
        'finder': function (nodes, name, type) {
            var low = 0,
                high = nodes ? nodes.length : low,
                found = null,
                mid,
                nameLc = name.toLowerCase();

            while (low < high) {
                mid = (low + high) >>> 1;
                var node = nodes[mid];

                if (node.name.toLowerCase() < nameLc) {
                    low = mid = mid + 1;
                } else if (node.name.toLowerCase() > nameLc) {
                    high = mid;
                } else {
                    found = node;
                    break;
                }
            }

            return type === 'index' ? (mid === undefined ? -1 : mid ) : found;
        },
        DOUBLE_SPACE: '&nbsp;&nbsp;'
    };
})
;