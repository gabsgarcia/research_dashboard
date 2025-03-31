// lodash/some@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/some.js

import{a as r}from"./_/af3602f5.js";import s from"./_baseIteratee.js";import{_ as t}from"./_/de2b55d3.js";import i from"./isArray.js";import{_ as o}from"./_/7781ca7a.js";import"./_Stack.js";import"./_/9e9ce10f.js";import"./_/70a2d34d.js";import"./_/58273e1c.js";import"./isFunction.js";import"./_/052e9e66.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./isObject.js";import"./eq.js";import"./_/38d0670d.js";import"./_/202e3ffb.js";import"./_/8ae180c0.js";import"./_/2d8124ce.js";import"./_/2eee999b.js";import"./_/daaca3a5.js";import"./_/0d4c4e14.js";import"./_/bd638668.js";import"./_arrayFilter.js";import"./stubArray.js";import"./keys.js";import"./_/d533f765.js";import"./_/c8441f51.js";import"./isArguments.js";import"./isObjectLike.js";import"./isBuffer.js";import"./stubFalse.js";import"./_isIndex.js";import"./isTypedArray.js";import"./isLength.js";import"./_/dcdb9fca.js";import"./_/9f64fdae.js";import"./_/27d5b997.js";import"./_/1d469fdd.js";import"./_/d2b8ecf6.js";import"./isArrayLike.js";import"./_getTag.js";import"./_Promise.js";import"./_/88299394.js";import"./_/7efbe7b0.js";import"./_/8ebfb7da.js";import"./_/28307068.js";import"./_/2bd9b4ce.js";import"./_/56083916.js";import"./_/c4c1a0d8.js";import"./get.js";import"./_/1041f72c.js";import"./_/bc3c29ea.js";import"./isSymbol.js";import"./_stringToPath.js";import"./memoize.js";import"./toString.js";import"./_/e4fbb684.js";import"./_arrayMap.js";import"./_toKey.js";import"./hasIn.js";import"./_/70531f52.js";import"./identity.js";import"./property.js";import"./_baseProperty.js";import"./_baseForOwn.js";import"./_/d603d993.js";import"./_/ae1a03d5.js";import"./_/3edfb04c.js";var m={};var p=t;
/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */function baseSome$1(r,s){var t;p(r,(function(r,i,o){t=s(r,i,o);return!t}));return!!t}m=baseSome$1;var j=m;var e={};var a=r,_=s,d=j,b=i,f=o;
/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */function some(r,s,t){var i=b(r)?a:d;t&&f(r,s,t)&&(s=void 0);return i(r,_(s,3))}e=some;var c=e;export{c as default};

