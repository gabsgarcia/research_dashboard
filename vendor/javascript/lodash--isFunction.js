// lodash/isFunction@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/isFunction.js

import{_ as t}from"./_/052e9e66.js";import o from"./isObject.js";import"./_/e65ed236.js";import"./_/b15bba73.js";var r={};var e=t,n=o;var i="[object AsyncFunction]",c="[object Function]",a="[object GeneratorFunction]",s="[object Proxy]";
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function isFunction(t){if(!n(t))return false;var o=e(t);return o==c||o==a||o==i||o==s}r=isFunction;var j=r;export{j as default};

