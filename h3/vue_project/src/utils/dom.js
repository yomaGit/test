/**
 * @from iview table
 * */

export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

export const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

export function getNode_class(nodes,cla){

  let arrCla=[];

  f(nodes);
  function f(obj) {
    let arrNodes=obj.childNodes;
    for(let i=0;i<arrNodes.length;i++){
      let ai=arrNodes[i];
      let classNames=ai.className;
      if(classNames&&classNames.split(' ').indexOf(cla)>-1){
        arrCla.push(ai);
      }else{
        f(ai)
      }
    }
  }

  return arrCla;
}

export function hasClass(node,cla) {
  let classNames=node.className;
  return classNames&&classNames.split(' ').indexOf(cla)>-1 ? true : false;
}
