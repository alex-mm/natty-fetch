/**
 * 对象扩展
 * @param  {Object} receiver
 * @param  {Object} supplier
 * @return {Object} 扩展后的receiver对象
 */
let extend = (receiver = {}, supplier = {}) => {
    for (let key in supplier) {
        if (supplier.hasOwnProperty(key) && supplier[key] !== undefined) {
            receiver[key] = supplier[key];
        }
    }
    return receiver;
}

/**
 * 变换两个参数的函数到多个参数
 * @param  {Function} fn 基函数
 * @return {Function} 变换后的函数
 * @demo
 *      function add(x, y) { return x+y; }
 *      add = redo(add);
 *      add(1,2,3) => 6
 */
let redo =(fn) => {
    return function () {
        var args = arguments;
        var ret = fn(args[0], args[1]);
        for (var i = 2, l = args.length; i < l; i++) {
            ret = fn(ret, args[i]);
        }
        return ret;
    }
}

const random = Math.random;
const floor = Math.floor;
let makeRandom = () => {
    return floor(random() * 9e9);
}

// 给URL追加查询字符串
let escape = encodeURIComponent;
let appendQueryString = (url, obj, cache) => {
    let kv = [];

    // 是否追加noCache参数
    !cache && kv.push('noCache=' + makeRandom());

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            kv.push(escape(key) + '=' + escape(obj[key]));
        }
    }

    if (kv.length) {
        return url + (~url.indexOf('?') ? '&' : '?') + kv.join('&');
    } else {
        return url;
    }
}


const absoluteUrlReg = /^(https?:)?\/\//;
let isAbsoluteUrl = (url) => {
    return !!url.match(absoluteUrlReg);
}

const BOOLEAN = 'boolean';
let isBoolean = (v) => {
    return typeof v === BOOLEAN;
}

const FUNCTION = 'function';
let isFunction = (v) => {
    return typeof v === FUNCTION;
}

let runAsFn = (v) => {
    return isFunction(v) ? v() : v;
};

const NUMBER = 'number';
let isNumber = (v) => {
    return !isNaN(v) && typeof v === NUMBER;
}

module.exports = {
    extend: redo(extend),
    makeRandom,
    appendQueryString,
    noop(v) {return v;},
    isAbsoluteUrl,
    isBoolean,
    isFunction,
    isNumber,
    runAsFn
};