import Vue from 'vue'
import {
  Button,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Icon,
  Toast, // 登录中提示
  CountDown // 倒计时组件
} from 'vant'

// 注册
Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Field)
  .use(Icon)
  .use(Toast)
  .use(CountDown)
