/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodeList) {
    this.nodeList = nodeList;
  }



  html(string) {
    if (string === "" || string) {
      this.nodeList.forEach((node) => {node.innerHTML = string;});
    } else if (!string) {
      return this.nodeList[0].innerHTML;
    }
  }

  empty() {
    return this.html("");
  }

  append(arg) {
    // debugger
    this.nodeList.forEach((node) => {
      if (typeof arg === 'string') {
        node.innerHTML = node.innerHTML.concat(arg);
      } else if (arg instanceof DOMNodeCollection) {
        arg.nodeList.forEach((argNode) => {
          node.innerHTML = node.innerHTML.concat(argNode.outerHTML);
        });
      } else if (arg instanceof HTMLElement) {
        node.innerHTML = node.innerHTML.concat(arg.outerHTML);
      }
    });
  }

  attr(attributeName, val) {
    if (val) {
      this.nodeList.forEach((node) => {
        node.attributeName = val;
      });
    } else {
      return this.nodeList[0].attributeName;
    }
  }

  addClass(name) {
    if (!name) {
      return this.nodeList[0].className;
    } else {
      this.nodeList.forEach((node) => {
        node.className = name;
      });
    }
  }

  removeClass(name) {
    if (!name) {
      this.nodeList.forEach((node) => {
        node.className = null;
      });
    } else {
      this.nodeList.forEach((node) => {
        let classes = node.className.split(" ");
        delete classes[classes.indexOf(name)];
        node.className = classes.join(" ");
      });
    }
  }

  children() {
    let results = [];
    this.nodeList.forEach((node) => {
      results = results.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(results);
  }

  parent() {
    let results = [];
    this.nodeList.forEach((node) => {
      results.push(node.parentElement);
    });
    return new DOMNodeCollection(results);
  }

  innerFind(arg)  {
    if (this.children().nodeList.length === 0) return [];
    let currentStep = [];
    this.nodeList.forEach((node) => {
      currentStep = currentStep.concat(Array.from(
        node.querySelectorAll(arg)
      ));
    });

    return this.children().innerFind(arg).concat(currentStep);
  }

  find(arg) {
    let arr = this.innerFind(arg);
    return new DOMNodeCollection(arr);
  }

  remove() {
    this.nodeList.forEach((node) => {
      node.outerHTML = "";
      delete this.nodeList[this.nodeList.indexOf(node)];
    });
  }
}


module.exports = DOMNodeCollection;











//this is here


/***/ })
/******/ ]);