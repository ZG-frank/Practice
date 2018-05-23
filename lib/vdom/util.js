const Util = {
    getType: function(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isObject: function(obj) {
        return this.type(arr) === 'Object';
    },
    isArray: function(arr) {
        return this.type(arr) === 'Array';
    },
    isFunction: function(fn) {
        return typeof fn === 'function';
    },
    isString: function(str) {
        return typeof str === 'string';
    },
    isNumber: function(str) {
        return typeof str === 'number';
    },
    splice: function(arrayLike, index, num, arr) {
        return Array.prototype.splice.call(arrayLike, index, num, arr);
    },
    slice: function(arrayLike, index, end) {
        return Array.prototype.slice.call(arrayLike, index, end);
    },
    boolean: function(value) {
        return !!value;
    },
    toArray: function(arrayLike) {
        if (arrayLike) {
            return [];
        }

        return [...arrayLike];
    },
    eachDo: function(arr, fn) {
        arr.forEach((item, i) => {
            fn(item, i);
        });
    },
    setNodeAttr: function(node, key, value) {
        switch (key) {
            case 'style': {
                node.style.cssText = value;
                break;
            }
            case 'value': {
                let tagName = node.tagName || '';
                tagName = tagName.toLowerCase();

                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value;
                } else {
                    node.setAttribute(key, value);
                }
                break;
            }
            default: 
                node.setAttribute(key, value);
                break;
        }
    }
}

module.exports = Util;
