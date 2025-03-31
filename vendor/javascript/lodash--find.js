// lodash/find@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/find.js

import{_ as r}from"./_/14d1c9f0.js";import t from"./findIndex.js";import"./_baseIteratee.js";import"./_/8ebfb7da.js";import"./_/28307068.js";import"./_Stack.js";import"./_/9e9ce10f.js";import"./_/70a2d34d.js";import"./_/58273e1c.js";import"./isFunction.js";import"./_/052e9e66.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./isObject.js";import"./eq.js";import"./_/38d0670d.js";import"./_/af3602f5.js";import"./_/202e3ffb.js";import"./_/8ae180c0.js";import"./_/2d8124ce.js";import"./_/2eee999b.js";import"./_/daaca3a5.js";import"./_/0d4c4e14.js";import"./isArray.js";import"./_/bd638668.js";import"./_arrayFilter.js";import"./stubArray.js";import"./keys.js";import"./_/d533f765.js";import"./_/c8441f51.js";import"./isArguments.js";import"./isObjectLike.js";import"./isBuffer.js";import"./stubFalse.js";import"./_isIndex.js";import"./isTypedArray.js";import"./isLength.js";import"./_/dcdb9fca.js";import"./_/9f64fdae.js";import"./_/27d5b997.js";import"./_/1d469fdd.js";import"./_/d2b8ecf6.js";import"./isArrayLike.js";import"./_getTag.js";import"./_Promise.js";import"./_/88299394.js";import"./_/7efbe7b0.js";import"./_/2bd9b4ce.js";import"./_/56083916.js";import"./_/c4c1a0d8.js";import"./get.js";import"./_/1041f72c.js";import"./_/bc3c29ea.js";import"./isSymbol.js";import"./_stringToPath.js";import"./memoize.js";import"./toString.js";import"./_/e4fbb684.js";import"./_arrayMap.js";import"./_toKey.js";import"./hasIn.js";import"./_/70531f52.js";import"./identity.js";import"./property.js";import"./_baseProperty.js";import"./_/845c0fe8.js";import"./toInteger.js";import"./toFinite.js";import"./toNumber.js";import"./_/83742462.js";import"./_/69d56582.js";var i={};var s=r,o=t;
/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */var m=s(o);i=m;var p=i;export{p as default};

