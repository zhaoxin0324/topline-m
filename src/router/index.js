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
  path: '/user/profile',
  component: () => import('@/views/user-profile')
}, {
  path: '/user/chat',
  name: 'user-chat',
  component: () => import('@/views/user-chat')
}, {
  path: '/user/:userId',
  name: 'user',
  component: () => import('@/views/user')
}, {
  path: '/search',
  name: 'search',
  component: () => import('@/views/search')
}, {
  path: '/article/:articleId',
  name: 'article',
  component: () => import ('@/views/articles'),
  props: true
}, { // 我的作品
  path: '/my-article', // /my-article /my-article/a /my-article/b
  name: 'my-article',
  component: () => import('@/views/user-articles'),
  props: true
}, { // 我的收藏
  path: '/my-article/collect',
  name: 'my-article-collect',
  component: () => import('@/views/user-articles')
}, { // 我的历史
  path: '/my-article/history',
  name: 'my-article-history',
  component: () => import('@/views/user-articles')
}
]

const router = new VueRouter({
  routes
})

export default router
