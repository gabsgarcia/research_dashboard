// lodash/isPlainObject@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/isPlainObject.js

import{_ as r}from"./_/052e9e66.js";import{_ as t}from"./_/ca1e037e.js";import e from"./isObjectLike.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./_/d2b8ecf6.js";var o={};var a=r,c=t,i=e;var n="[object Object]";var s=Function.prototype,j=Object.prototype;var p=s.toString;var f=j.hasOwnProperty;var l=p.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */function isPlainObject(r){if(!i(r)||a(r)!=n)return false;var t=c(r);if(null===t)return true;var e=f.call(t,"constructor")&&t.constructor;return"function"==typeof e&&e instanceof e&&p.call(e)==l}o=isPlainObject;var b=o;export{b as default};

