import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import { NavBar, Form, Field, CellGroup, ConfigProvider, Button, Icon, Tabbar, TabbarItem, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Col, Row, Badge, Search, Divider, Tag, Dialog, Image as VanImage, Uploader, DatetimePicker } from 'vant'
// 导入移动端适配
import 'amfe-flexible'

// 创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)

// 挂载
app
  .use(store)
  .use(router)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(ConfigProvider)
  .use(Button)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(List)
  .use(PullRefresh)
  .use(ActionSheet)
  .use(Popup)
  .use(Col)
  .use(Row)
  .use(Badge)
  .use(Search)
  .use(Divider)
  .use(Tag)
  .use(Dialog)
  .use(VanImage)
  .use(Uploader)
  .use(DatetimePicker)
  .mount('#app')

// 自定义指令  自动聚焦
app.directive('fofo', {
  mounted(el) {
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
  },
  updated(el) {
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
})
