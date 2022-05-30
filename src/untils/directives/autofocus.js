// 自定义自动聚焦指令
function autoFocus(el) {
  console.log(el)
}

export default {
  mounted(el) {
    autoFocus(el)
  },
  updated(el) {
    autoFocus(el)
  }
}
