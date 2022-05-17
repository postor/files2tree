"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.files2tree = void 0;
function files2tree(files, getPath = (x => x)) {
    let pathes = files.map(x => {
        let p = getPath(x);
        return [p, x, p.split(/\/|\\/g)];
    });
    pathes.sort(([a], [b]) => a.localeCompare(b));
    let rtn = {
        children: [],
        name: ''
    };
    r(0, 0, rtn);
    return rtn.children;
    function r(i = 0, j = 0, p, iEnd = pathes.length) {
        if (i >= pathes.length)
            return;
        if (j >= pathes[i][2].length)
            return;
        let t = {
            children: [],
            name: pathes[i][2][j],
        };
        if (j == pathes[i][2].length - 1) {
            t.data = pathes[i][1];
            p.children.push(t);
            r(i + 1, j, p, iEnd);
            return;
        }
        t.folders = 0;
        let k = i + 1, done = false;
        for (; k < iEnd; k++) {
            if (!pathes[k] || !pathes[k][2][j] || pathes[k][2][j] !== t.name) {
                r(i, j + 1, t, k);
                done = true;
                break;
            }
        }
        if (!done)
            r(i, j + 1, t, iEnd);
        delete t.folders;
        let cur = (p.folders || 0);
        p.children.splice(cur, 0, t);
        p.folders = cur + 1;
        r(k, j, p, iEnd);
    }
}
exports.files2tree = files2tree;
exports.default = files2tree;
