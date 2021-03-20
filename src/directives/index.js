// 导出指令对象

export const imagerror = {
  inserted(dom, options) {
    dom.onerror = () => {
      dom.src = options.value
    }
  }
}
