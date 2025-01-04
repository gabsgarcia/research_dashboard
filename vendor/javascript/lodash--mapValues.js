// lodash/mapValues@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/mapValues.js

import{_ as r}from"./_/762679ff.js";import t from"./_baseForOwn.js";import s from"./_baseIteratee.js";import"./_/d35a7fd6.js";import"./_/70a2d34d.js";import"./_/58273e1c.js";import"./isFunction.js";import"./_/052e9e66.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./isObject.js";import"./_/d603d993.js";import"./_/ae1a03d5.js";import"./keys.js";import"./_/d533f765.js";import"./_/c8441f51.js";import"./isArguments.js";import"./isObjectLike.js";import"./isArray.js";import"./isBuffer.js";import"./stubFalse.js";import"./_isIndex.js";import"./isTypedArray.js";import"./isLength.js";import"./_/dcdb9fca.js";import"./_/9f64fdae.js";import"./_/27d5b997.js";import"./_/1d469fdd.js";import"./_/d2b8ecf6.js";import"./isArrayLike.js";import"./_/8ebfb7da.js";import"./_/28307068.js";import"./_Stack.js";import"./_/9e9ce10f.js";import"./eq.js";import"./_/38d0670d.js";import"./_/af3602f5.js";import"./_/202e3ffb.js";import"./_/8ae180c0.js";import"./_/2d8124ce.js";import"./_/2eee999b.js";import"./_/daaca3a5.js";import"./_/0d4c4e14.js";import"./_/bd638668.js";import"./_arrayFilter.js";import"./stubArray.js";import"./_getTag.js";import"./_Promise.js";import"./_/88299394.js";import"./_/7efbe7b0.js";import"./_/2bd9b4ce.js";import"./_/56083916.js";import"./_/c4c1a0d8.js";import"./get.js";import"./_/1041f72c.js";import"./_/bc3c29ea.js";import"./isSymbol.js";import"./_stringToPath.js";import"./memoize.js";import"./toString.js";import"./_/e4fbb684.js";import"./_arrayMap.js";import"./_toKey.js";import"./hasIn.js";import"./_/70531f52.js";import"./identity.js";import"./property.js";import"./_baseProperty.js";var i={};var o=r,m=t,p=s;
/**
 * Creates an object with the same keys as `object` and values generated
 * by running each own enumerable string keyed property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapKeys
 * @example
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * _.mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 *
 * // The `_.property` iteratee shorthand.
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */function mapValues(r,t){var s={};t=p(t,3);m(r,(function(r,i,m){o(s,i,t(r,i,m))}));return s}i=mapValues;var j=i;export{j as default};

