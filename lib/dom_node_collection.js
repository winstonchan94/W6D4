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
