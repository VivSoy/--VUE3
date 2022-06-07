// 对vue中的全局指令进行封装

// 自动聚焦函数
function fofo(el) {
  // 如果el本身就是input或textarea
  if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    el.focus()
  } else {
    // 指令所在的组件标签为div，input或textarea在其内部
    const ipt = el.querySelector('input')
    const textArea = el.querySelector('textarea')
    // 如果找到了
    if (ipt || textArea) {
      ipt && ipt.focus()
      textArea && textArea.focus()
    } else {
      // 本身也不是, 子标签里也没有
      console.error('请把v-fofo用在输入框标签上')
    }
  }
}

export default {
  mounted(el) {
    fofo(el)
  },
  updated(el) {
    fofo(el)
  }
}
