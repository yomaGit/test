const autoFocus = {
  bind(){//- 初次调用自行一次
    console.log(`%cautoFocus bind`,`color:red;`);
  },
  inserted(el,binding,vNode){//- 插入父节点

    console.log(`%c-----autoFocus inserted test start`,`color:red`)

    el.style.border='1px solid red';
    el.focus()

    console.log(`所绑定的元素：`)
    console.log(el);

    console.log(`虚拟dom节点：`)
    console.log(vNode);

    console.log(`%c-----autoFocus inserted test end`,`color:red`);

  },
  update(){//- 节点自身更新
    console.log(`%cautoFocus update`,'color:red;');
  },
  componentUpdated(){//- .vue组件整体更新
    console.log('%cautoFocus componentUpdated','color:red;');
  },
  unbind(){//- 解绑
    console.log('%cautoFocus unbind','color:red;');
    console.log(`%c----华丽的分割线----`,'color:red;');
  }

}
export default autoFocus;
