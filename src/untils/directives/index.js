// 导入自动聚焦指令
import autofocus from '@/untils/directives/autofocus.js'

export default app => {
  app.directive('autofocus', autofocus)
}
