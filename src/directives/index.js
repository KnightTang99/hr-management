// 导出指令对象

export const imagerror = {
  inserted(dom, options) {
    // console.log(options)
    // dom是插入的标签，options是对指令绑定的变量的描述,包含图片信息
    dom.src = dom.src || options.value
    dom.onerror = () => {
      dom.src = options.value // value就是绑定的变量
    }
  },
  componentUpdated(dom, options) {
    // 此钩子函数会在数据更新之后执行
    dom.src = dom.src || options.value
  }
}
