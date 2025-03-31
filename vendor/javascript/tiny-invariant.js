// tiny-invariant@1.3.3 downloaded from https://ga.jspm.io/npm:tiny-invariant@1.3.3/dist/esm/tiny-invariant.js

var r=process.env.NODE_ENV==="production";var n="Invariant failed";function invariant(a,o){if(!a){if(r)throw new Error(n);var t=typeof o==="function"?o():o;var i=t?"".concat(n,": ").concat(t):n;throw new Error(i)}}export{invariant as default};

