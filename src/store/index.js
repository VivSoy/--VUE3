// vuex使用
import { createStore } from 'vuex'

export default createStore({
  state: {
    userPhoto:
      'https://image.so.com/view?q=%E5%A4%B4%E5%83%8F&listsrc=sobox&listsign=a263141a77b4f4ee3c1e9e60afa75c8d&src=relation_qqimage&correct=%E5%A4%B4%E5%83%8F&ancestor=list&cmsid=2c7b7f81aced324bee52df9d5c5f3d37&cmras=1&cn=0&gn=0&kn=44&crn=0&bxn=0&fsn=104&cuben=0&pornn=0&manun=48&adstar=0&clw=254#id=a263141a77b4f4ee3c1e9e60afa75c8d&currsn=0&ps=143&pc=143' // 头像地址
  },
  getters: {},
  mutations: {
    // 编码风格，mutations大写
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    }
  },
  actions: {},
  modules: {}
})
