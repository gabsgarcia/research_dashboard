// lodash/isString@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/isString.js

import{_ as r}from"./_/052e9e66.js";import t from"./isArray.js";import i from"./isObjectLike.js";import"./_/e65ed236.js";import"./_/b15bba73.js";var o={};var s=r,e=t,a=i;var m="[object String]";
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */function isString(r){return"string"==typeof r||!e(r)&&a(r)&&s(r)==m}o=isString;var j=o;export{j as default};

