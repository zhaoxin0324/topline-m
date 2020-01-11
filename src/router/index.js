import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
  path: '/login',
  component: () => import('@/views/login')
}, {
  path: '/',
  component: () => import('@/views/tabbar'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  }, {
    path: 'qa',
    name: 'qa',
    component: () => import('@/views/qa')
  }, {
    path: 'video',
    name: 'video',
    component: () => import('@/views/video')
  }, {
    path: 'my',
    name: 'my',
    component: () => import('@/views/my')
  }]
}, {
  path: '/user/:userId',
  name: 'user',
  component: () => import('@/views/user')
}
]

const router = new VueRouter({
  routes
})

export default router
