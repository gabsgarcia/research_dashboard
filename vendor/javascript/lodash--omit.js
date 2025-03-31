// lodash/omit@4.17.21 downloaded from https://ga.jspm.io/npm:lodash@4.17.21/omit.js

import r from"./_arrayMap.js";import t from"./_baseClone.js";import{_ as i}from"./_/10d85f2a.js";import{_ as s}from"./_/bc3c29ea.js";import{_ as o}from"./_/b1449f65.js";import m from"./isPlainObject.js";import{_ as p}from"./_/c5cd3f55.js";import{a as j}from"./_/de872e80.js";import"./_Stack.js";import"./_/9e9ce10f.js";import"./_/70a2d34d.js";import"./_/58273e1c.js";import"./isFunction.js";import"./_/052e9e66.js";import"./_/e65ed236.js";import"./_/b15bba73.js";import"./isObject.js";import"./eq.js";import"./_/38d0670d.js";import"./_arrayEach.js";import"./_assignValue.js";import"./_/762679ff.js";import"./_/d35a7fd6.js";import"./_baseAssign.js";import"./keys.js";import"./_/d533f765.js";import"./_/c8441f51.js";import"./isArguments.js";import"./isObjectLike.js";import"./isArray.js";import"./isBuffer.js";import"./stubFalse.js";import"./_isIndex.js";import"./isTypedArray.js";import"./isLength.js";import"./_/dcdb9fca.js";import"./_/9f64fdae.js";import"./_/27d5b997.js";import"./_/1d469fdd.js";import"./_/d2b8ecf6.js";import"./isArrayLike.js";import"./keysIn.js";import"./_cloneBuffer.js";import"./_copyArray.js";import"./_copySymbols.js";import"./_/bd638668.js";import"./_arrayFilter.js";import"./stubArray.js";import"./_/daaca3a5.js";import"./_/0d4c4e14.js";import"./_getTag.js";import"./_Promise.js";import"./_/88299394.js";import"./_/7efbe7b0.js";import"./_initCloneArray.js";import"./_initCloneByTag.js";import"./_/38f90d17.js";import"./_/8ae180c0.js";import"./_initCloneObject.js";import"./_/79ae4a01.js";import"./_/ca1e037e.js";import"./isMap.js";import"./isSet.js";import"./last.js";import"./_/d3d3f4b3.js";import"./_/1041f72c.js";import"./_toKey.js";import"./isSymbol.js";import"./_/aa7b2d10.js";import"./_stringToPath.js";import"./memoize.js";import"./toString.js";import"./_/e4fbb684.js";import"./flatten.js";import"./_/4dae2565.js";import"./_overRest.js";import"./_apply.js";import"./_/ead8ed36.js";import"./constant.js";import"./identity.js";var e={};var a=m;
/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */function customOmitClone$1(r){return a(r)?void 0:r}e=customOmitClone$1;var _=e;var f={};var n=r,d=t,c=i,b=s,l=o,y=_,u=p,v=j;var g=1,A=2,h=4;
/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */var C=u((function(r,t){var i={};if(null==r)return i;var s=false;t=n(t,(function(t){t=b(t,r);s||(s=t.length>1);return t}));l(r,v(r),i);s&&(i=d(i,g|A|h,y));var o=t.length;while(o--)c(i,t[o]);return i}));f=C;var O=f;export{O as default};

