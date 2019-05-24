const baseSize = 20

function setRem() {
  let documentWidth = document.documentElement.clientWidth;
  let baseWidth = documentWidth;
  let scale = baseWidth / 1920;
  if (scale > 1) scale = 1;
  document.documentElement.style.fontSize = (baseSize * scale) + 'px'
}

setRem()
window.onresize = function () {
  setRem()
}
