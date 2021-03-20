// 导出指令对象

export const imagerror = {
  inserted(dom, options) {
    // dom是插入的标签，options是对指令绑定的变量的描述
    dom.onerror = () => {
      dom.src = options.value // value就是绑定的变量
    }
  }
}
