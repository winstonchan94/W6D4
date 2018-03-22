const DOMNodeCollection = require('./dom_node_collection');

function $l(arg) {
  if (typeof arg === 'string') {
    const nodeList = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(nodeList);
  }
   else if (arg instanceof HTMLElement) {
    const nodeList = [arg];
    return new DOMNodeCollection(nodeList);
  }
}

window.$l = $l;
