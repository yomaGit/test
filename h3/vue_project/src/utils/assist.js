
// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

// tag标签转换为highlight的span
function tagToSpan(str) {
  let arrStr=str.split('');
  let newStr='';
  for(let i=0;i<arrStr.length;i++){
    let ai=arrStr[i];
    if(ai=='<') ai=ai+'<span>';
    else if(ai=='>') ai='</span>'+ai;
    newStr+=ai;
  }
  return newStr;
}

// json对象转换为components结构
export function jsonToRender(tem) {
  let template={};
  for(let i in tem){
    let tv=tem[i];
    template[i.toString()+'Code']={
      template:`<div>${tagToSpan(tv)}</div>`
    }
  }
  return template;
}

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}

// deepCopy
function deepCopy(data) {

  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if ( t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if ( t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export {deepCopy}

// 百分比转换成小数点
export function perTopoint(val) {
  if(val.indexOf('%')>-1){
    return parseInt(val)/100
  }else{
    return val
  }
}
