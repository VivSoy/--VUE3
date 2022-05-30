import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import { NavBar, Form, Field, CellGroup, ConfigProvider, Button, Icon, Tabbar, TabbarItem, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Col, Row, Badge, Search, Divider } from 'vant'
// 导入移动端适配
import 'amfe-flexible'

// 创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)

// 挂载
app.use(store).use(router).use(NavBar).use(Form).use(Field).use(CellGroup).use(ConfigProvider).use(Button).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Cell).use(List).use(PullRefresh).use(ActionSheet).use(Popup).use(Col).use(Row).use(Badge).use(Search).use(Divider).mount('#app')

// 自定义指令  自动聚焦
app.directive('fofo', {
  mounted(el) {
    // 指令所在的组件标签为div，input在其内部
    const ipt = el.querySelector('input')
    ipt.focus()
  }
})
