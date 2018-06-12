/**
 * author: baungo
 * github: https://github.com/Baungo
 * date: 2018-06-12
 */

function format(str) {
    let css = [];
    let row = {key: '', value: []};
    let innerRow = {key: '', value: []};
    let innerRows = [];
    let item = {};
    let items = [];
    let register = '';
    let b = 0;
    let process = false;

    let media = false;
    const up2one = () => {
        process = true;
        row.key = register.trim();
        register = '';
    };
    const up2two = () => {
        media = true;
        innerRow = {};
        items = [];
        innerRow.key = register.trim();
        register = '';
    };
    const down2one = () => {
        if (register.trim()) {
            item.value = register.trim();
            register = '';
            items.push(item);
        }
        innerRow.value = items;
        innerRows.push(innerRow);
        innerRow = {};
        items = []
    };
    const down2zero = () => {
        if (media) {
            if (items.length) {
                innerRow.value = items;
                innerRows.push(innerRow);
            }
            row.value = innerRows;
            css.push(row);
        } else {
            if (register.trim()) {
                item.value = register;
                register = '';
                items.push(item);
            }
            row.value = items;
            css.push(row);
        }
        media = false;
        process = false;

        row = {};
        items = [];
        item = {};
        innerRow = {};
        innerRows = [];

    };
    for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (c === '{') {
            b++;
        } else if (c === '}') {
            b--;
        }
        if (c === '{') {
            if (b === 1) {
                up2one();
            } else {
                up2two();
            }
        } else if (c === '}') {
            if (b === 1) {
                down2one();
            } else {
                down2zero();
            }
        } else if (c === ':') {
            if (!process) {
                register += c;
                continue;
            };
            item = {};
            item.key = register.trim();
            register = '';
        } else if (c === ';') {
            // item value
            item.value = register.trim();
            register = '';
            items.push(item);
        } else {
            register += c;
        }
    }
    return css;
}
