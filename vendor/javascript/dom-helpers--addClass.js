// dom-helpers/addClass@5.2.0 downloaded from https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/addClass.js

import s from"./hasClass.js";function addClass(a,l){a.classList?a.classList.add(l):s(a,l)||("string"===typeof a.className?a.className=a.className+" "+l:a.setAttribute("class",(a.className&&a.className.baseVal||"")+" "+l))}export default addClass;

