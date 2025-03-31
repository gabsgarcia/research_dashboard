// lodash/isBoolean@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/isBoolean.js

import{_ as e}from"./_/052e9e66.js";import o from"./isObjectLike.js";import"./_/e65ed236.js";import"./_/b15bba73.js";var r={};var a=e,t=o;var s="[object Boolean]";
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */function isBoolean(e){return true===e||false===e||t(e)&&a(e)==s}r=isBoolean;var i=r;export{i as default};

