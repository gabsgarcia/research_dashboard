// recharts-scale@0.4.5 downloaded from https://ga.jspm.io/npm:recharts-scale@0.4.5/lib/index.js

import e from"decimal.js-light";var r={};Object.defineProperty(r,"__esModule",{value:true});r.memoize=r.reverse=r.compose=r.map=r.range=r.curry=r.PLACE_HOLDER=void 0;function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){if(e){if("string"===typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);return"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _iterableToArray(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}var t=function identity(e){return e};var a={"@@functional/placeholder":true};r.PLACE_HOLDER=a;var n=function isPlaceHolder(e){return e===a};var i=function curry0(e){return function _curried(){return 0===arguments.length||1===arguments.length&&n(arguments.length<=0?void 0:arguments[0])?_curried:e.apply(void 0,arguments)}};var u=function curryN(e,r){return 1===e?r:i((function(){for(var t=arguments.length,u=new Array(t),o=0;o<t;o++)u[o]=arguments[o];var l=u.filter((function(e){return e!==a})).length;return l>=e?r.apply(void 0,u):curryN(e-l,i((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var i=u.map((function(e){return n(e)?t.shift():e}));return r.apply(void 0,_toConsumableArray(i).concat(t))})))}))};var o=function curry(e){return u(e.length,e)};r.curry=o;var l=function range(e,r){var t=[];for(var a=e;a<r;++a)t[a-e]=a;return t};r.range=l;var f=o((function(e,r){return Array.isArray(r)?r.map(e):Object.keys(r).map((function(e){return r[e]})).map(e)}));r.map=f;var c=function compose(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];if(!r.length)return t;var n=r.reverse();var i=n[0];var u=n.slice(1);return function(){return u.reduce((function(e,r){return r(e)}),i.apply(void 0,arguments))}};r.compose=c;var d=function reverse(e){return Array.isArray(e)?e.reverse():e.split("").reverse.join("")};r.reverse=d;var v=function memoize(e){var r=null;var t=null;return function(){for(var a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];if(r&&n.every((function(e,t){return e===r[t]})))return t;r=n;t=e.apply(void 0,n);return t}};r.memoize=v;var s={};Object.defineProperty(s,"__esModule",{value:true});s.default=void 0;var y=_interopRequireDefault(e);var m=r;function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}
/**
 * 获取数值的位数
 * 其中绝对值属于区间[0.1, 1)， 得到的值为0
 * 绝对值属于区间[0.01, 0.1)，得到的位数为 -1
 * 绝对值属于区间[0.001, 0.01)，得到的位数为 -2
 *
 * @param  {Number} value 数值
 * @return {Integer} 位数
 */function getDigitCount(e){var r;r=0===e?1:Math.floor(new y.default(e).abs().log(10).toNumber())+1;return r}
/**
 * 按照固定的步长获取[start, end)这个区间的数据
 * 并且需要处理js计算精度的问题
 *
 * @param  {Decimal} start 起点
 * @param  {Decimal} end   终点，不包含该值
 * @param  {Decimal} step  步长
 * @return {Array}         若干数值
 */function rangeStep(e,r,t){var a=new y.default(e);var n=0;var i=[];while(a.lt(r)&&n<1e5){i.push(a.toNumber());a=a.add(t);n++}return i}
/**
 * 对数值进行线性插值
 *
 * @param  {Number} a  定义域的极点
 * @param  {Number} b  定义域的极点
 * @param  {Number} t  [0, 1]内的某个值
 * @return {Number}    定义域内的某个值
 */var p=(0,m.curry)((function(e,r,t){var a=+e;var n=+r;return a+t*(n-a)}));
/**
 * 线性插值的逆运算
 *
 * @param  {Number} a 定义域的极点
 * @param  {Number} b 定义域的极点
 * @param  {Number} x 可以认为是插值后的一个输出值
 * @return {Number}   当x在 a ~ b这个范围内时，返回值属于[0, 1]
 */var g=(0,m.curry)((function(e,r,t){var a=r-+e;a=a||Infinity;return(t-e)/a}));
/**
 * 线性插值的逆运算，并且有截断的操作
 *
 * @param  {Number} a 定义域的极点
 * @param  {Number} b 定义域的极点
 * @param  {Number} x 可以认为是插值后的一个输出值
 * @return {Number}   当x在 a ~ b这个区间内时，返回值属于[0, 1]，
 * 当x不在 a ~ b这个区间时，会截断到 a ~ b 这个区间
 */var b=(0,m.curry)((function(e,r,t){var a=r-+e;a=a||Infinity;return Math.max(0,Math.min(1,(t-e)/a))}));var _={rangeStep:rangeStep,getDigitCount:getDigitCount,interpolateNumber:p,uninterpolateNumber:g,uninterpolateTruncation:b};s.default=_;var h={};Object.defineProperty(h,"__esModule",{value:true});h.getTickValuesFixedDomain=h.getTickValues=h.getNiceTickValues=void 0;var A=_interopRequireDefault$1(e);var T=r;var w=_interopRequireDefault$1(s);function _interopRequireDefault$1(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray$1(e){return _arrayWithoutHoles$1(e)||_iterableToArray$1(e)||_unsupportedIterableToArray$1(e)||_nonIterableSpread$1()}function _nonIterableSpread$1(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray$1(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles$1(e){if(Array.isArray(e))return _arrayLikeToArray$1(e)}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray$1(e,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray$1(e,r){if(e){if("string"===typeof e)return _arrayLikeToArray$1(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);return"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray$1(e,r):void 0}}function _arrayLikeToArray$1(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}function _iterableToArrayLimit(e,r){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[];var a=true;var n=false;var i=void 0;try{for(var u,o=e[Symbol.iterator]();!(a=(u=o.next()).done);a=true){t.push(u.value);if(r&&t.length===r)break}}catch(e){n=true;i=e}finally{try{a||null==o.return||o.return()}finally{if(n)throw i}}return t}}function _arrayWithHoles(e){if(Array.isArray(e))return e}
/**
 * Calculate a interval of a minimum value and a maximum value
 *
 * @param  {Number} min       The minimum value
 * @param  {Number} max       The maximum value
 * @return {Array} An interval
 */function getValidInterval(e){var r=_slicedToArray(e,2),t=r[0],a=r[1];var n=t,i=a;if(t>a){n=a;i=t}return[n,i]}
/**
 * Calculate the step which is easy to understand between ticks, like 10, 20, 25
 *
 * @param  {Decimal} roughStep        The rough step calculated by deviding the
 * difference by the tickCount
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Integer} correctionFactor A correction factor
 * @return {Decimal} The step which is easy to understand between two ticks
 */function getFormatStep(e,r,t){if(e.lte(0))return new A.default(0);var a=w.default.getDigitCount(e.toNumber());var n=new A.default(10).pow(a);var i=e.div(n);var u=1!==a?.05:.1;var o=new A.default(Math.ceil(i.div(u).toNumber())).add(t).mul(u);var l=o.mul(n);return r?l:new A.default(Math.ceil(l))}
/**
 * calculate the ticks when the minimum value equals to the maximum value
 *
 * @param  {Number}  value         The minimum valuue which is also the maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}                 ticks
 */function getTickOfSingleValue(e,r,t){var a=1;var n=new A.default(e);if(!n.isint()&&t){var i=Math.abs(e);if(i<1){a=new A.default(10).pow(w.default.getDigitCount(e)-1);n=new A.default(Math.floor(n.div(a).toNumber())).mul(a)}else i>1&&(n=new A.default(Math.floor(e)))}else 0===e?n=new A.default(Math.floor((r-1)/2)):t||(n=new A.default(Math.floor(e)));var u=Math.floor((r-1)/2);var o=(0,T.compose)((0,T.map)((function(e){return n.add(new A.default(e-u).mul(a)).toNumber()})),T.range);return o(0,r)}
/**
 * Calculate the step
 *
 * @param  {Number}  min              The minimum value of an interval
 * @param  {Number}  max              The maximum value of an interval
 * @param  {Integer} tickCount        The count of ticks
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Number}  correctionFactor A correction factor
 * @return {Object}  The step, minimum value of ticks, maximum value of ticks
 */function calculateStep(e,r,t,a){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;if(!Number.isFinite((r-e)/(t-1)))return{step:new A.default(0),tickMin:new A.default(0),tickMax:new A.default(0)};var i=getFormatStep(new A.default(r).sub(e).div(t-1),a,n);var u;if(e<=0&&r>=0)u=new A.default(0);else{u=new A.default(e).add(r).div(2);u=u.sub(new A.default(u).mod(i))}var o=Math.ceil(u.sub(e).div(i).toNumber());var l=Math.ceil(new A.default(r).sub(u).div(i).toNumber());var f=o+l+1;if(f>t)return calculateStep(e,r,t,a,n+1);if(f<t){l=r>0?l+(t-f):l;o=r>0?o:o+(t-f)}return{step:i,tickMin:u.sub(new A.default(o).mul(i)),tickMax:u.add(new A.default(l).mul(i))}}
/**
 * Calculate the ticks of an interval, the count of ticks will be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */function getNiceTickValuesFn(e){var r=_slicedToArray(e,2),t=r[0],a=r[1];var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];var u=Math.max(n,2);var o=getValidInterval([t,a]),l=_slicedToArray(o,2),f=l[0],c=l[1];if(-Infinity===f||Infinity===c){var d=Infinity===c?[f].concat(_toConsumableArray$1((0,T.range)(0,n-1).map((function(){return Infinity})))):[].concat(_toConsumableArray$1((0,T.range)(0,n-1).map((function(){return-Infinity}))),[c]);return t>a?(0,T.reverse)(d):d}if(f===c)return getTickOfSingleValue(f,n,i);var v=calculateStep(f,c,u,i),s=v.step,y=v.tickMin,m=v.tickMax;var p=w.default.rangeStep(y,m.add(new A.default(.1).mul(s)),s);return t>a?(0,T.reverse)(p):p}
/**
 * Calculate the ticks of an interval, the count of ticks won't be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */function getTickValuesFn(e){var r=_slicedToArray(e,2),t=r[0],a=r[1];var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];var u=Math.max(n,2);var o=getValidInterval([t,a]),l=_slicedToArray(o,2),f=l[0],c=l[1];if(-Infinity===f||Infinity===c)return[t,a];if(f===c)return getTickOfSingleValue(f,n,i);var d=getFormatStep(new A.default(c).sub(f).div(u-1),i,0);var v=(0,T.compose)((0,T.map)((function(e){return new A.default(f).add(new A.default(e).mul(d)).toNumber()})),T.range);var s=v(0,u).filter((function(e){return e>=f&&e<=c}));return t>a?(0,T.reverse)(s):s}
/**
 * Calculate the ticks of an interval, the count of ticks won't be guraranteed,
 * but the domain will be guaranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */function getTickValuesFixedDomainFn(e,r){var t=_slicedToArray(e,2),a=t[0],n=t[1];var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];var u=getValidInterval([a,n]),o=_slicedToArray(u,2),l=o[0],f=o[1];if(-Infinity===l||Infinity===f)return[a,n];if(l===f)return[l];var c=Math.max(r,2);var d=getFormatStep(new A.default(f).sub(l).div(c-1),i,0);var v=[].concat(_toConsumableArray$1(w.default.rangeStep(new A.default(l),new A.default(f).sub(new A.default(.99).mul(d)),d)),[f]);return a>n?(0,T.reverse)(v):v}var k=(0,T.memoize)(getNiceTickValuesFn);h.getNiceTickValues=k;var I=(0,T.memoize)(getTickValuesFn);h.getTickValues=I;var S=(0,T.memoize)(getTickValuesFixedDomainFn);h.getTickValuesFixedDomain=S;var M={};Object.defineProperty(M,"__esModule",{value:true});Object.defineProperty(M,"getTickValues",{enumerable:true,get:function get(){return V.getTickValues}});Object.defineProperty(M,"getNiceTickValues",{enumerable:true,get:function get(){return V.getNiceTickValues}});Object.defineProperty(M,"getTickValuesFixedDomain",{enumerable:true,get:function get(){return V.getTickValuesFixedDomain}});var V=h;const N=M.__esModule,$=M.getTickValues,j=M.getNiceTickValues,D=M.getTickValuesFixedDomain;export default M;export{N as __esModule,j as getNiceTickValues,$ as getTickValues,D as getTickValuesFixedDomain};

