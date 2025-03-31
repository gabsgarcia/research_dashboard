// dom-helpers/removeClass@5.2.0 downloaded from https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/removeClass.js

function replaceClassName(s,e){return s.replace(new RegExp("(^|\\s)"+e+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function removeClass(s,e){s.classList?s.classList.remove(e):"string"===typeof s.className?s.className=replaceClassName(s.className,e):s.setAttribute("class",replaceClassName(s.className&&s.className.baseVal||"",e))}export default removeClass;

