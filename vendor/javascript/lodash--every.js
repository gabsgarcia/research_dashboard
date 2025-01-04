// lodash/every@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/every.js

import{_ as r}from"./_/eb0c2497.js";import{_ as t}from"./_/de2b55d3.js";import s from"./_baseIteratee.js";import i from"./isArray.js";import{_ as o}from"./_/7781ca7a.js";import"./_baseForOwn.js";import"./_/d603d993.js";import"./_/ae1a03d5.js";import"./keys.js";import"./_/d533f765.js";import"./_/c8441f51.js";import"./isArguments.js";import"./_/052e9e66.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./isObjectLike.js";import"./isBuffer.js";import"./stubFalse.js";import"./_isIndex.js";import"./isTypedArray.js";import"./isLength.js";import"./_/dcdb9fca.js";import"./_/9f64fdae.js";import"./_/27d5b997.js";import"./_/1d469fdd.js";import"./_/d2b8ecf6.js";import"./isArrayLike.js";import"./isFunction.js";import"./isObject.js";import"./_/3edfb04c.js";import"./_/8ebfb7da.js";import"./_/28307068.js";import"./_Stack.js";import"./_/9e9ce10f.js";import"./_/70a2d34d.js";import"./_/58273e1c.js";import"./eq.js";import"./_/38d0670d.js";import"./_/af3602f5.js";import"./_/202e3ffb.js";import"./_/8ae180c0.js";import"./_/2d8124ce.js";import"./_/2eee999b.js";import"./_/daaca3a5.js";import"./_/0d4c4e14.js";import"./_/bd638668.js";import"./_arrayFilter.js";import"./stubArray.js";import"./_getTag.js";import"./_Promise.js";import"./_/88299394.js";import"./_/7efbe7b0.js";import"./_/2bd9b4ce.js";import"./_/56083916.js";import"./_/c4c1a0d8.js";import"./get.js";import"./_/1041f72c.js";import"./_/bc3c29ea.js";import"./isSymbol.js";import"./_stringToPath.js";import"./memoize.js";import"./toString.js";import"./_/e4fbb684.js";import"./_arrayMap.js";import"./_toKey.js";import"./hasIn.js";import"./_/70531f52.js";import"./identity.js";import"./property.js";import"./_baseProperty.js";var m={};var p=t;
/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */function baseEvery$1(r,t){var s=true;p(r,(function(r,i,o){s=!!t(r,i,o);return s}));return s}m=baseEvery$1;var j=m;var e={};var _=r,a=j,d=s,b=i,f=o;
/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.every(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.every(users, 'active');
 * // => false
 */function every(r,t,s){var i=b(r)?_:a;s&&f(r,t,s)&&(t=void 0);return i(r,d(t,3))}e=every;var c=e;export{c as default};

