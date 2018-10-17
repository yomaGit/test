const stat = {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;

      const type=data.type;
      const fun=data.fun;
      console.log(`%c埋点数据被点击了 type:${type} fun:${fun}`,'color:red;');

    }, false);
  }
}
export default stat;
