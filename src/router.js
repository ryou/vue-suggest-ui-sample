import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from '@/views/Item'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Item,
      props: true,
    },
  ],
})
