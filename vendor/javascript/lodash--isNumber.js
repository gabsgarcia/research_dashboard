// lodash/isNumber@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/isNumber.js

import{_ as r}from"./_/052e9e66.js";import e from"./isObjectLike.js";import"./_/e65ed236.js";import"./_/b15bba73.js";var t={};var m=r,o=e;var b="[object Number]";
/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */function isNumber(r){return"number"==typeof r||o(r)&&m(r)==b}t=isNumber;var i=t;export{i as default};

