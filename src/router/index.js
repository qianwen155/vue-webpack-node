import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/common.css'
import '../assets/css/top_menu.css'
import '../assets/css/animate.css'
import '../assets/css/footer.css'
import '../assets/css/swiper-4.1.6.min.css'

Vue.use(Router)

import Shoplist from '../views/shop'
import Gooddetails from '../views/gooddetail'
import ShoppingCar from '../views/shoppingcar'
import Judge from '../views/judge'
import Payout from '../views/payout'
import Orderlist from '../views/order'
import Goodtype from '../views/goodtype'
import Login from '../views/login/login'
import Person from '../views/personpage'

import loginad from '../background/views/login_ad'
import index_ad from '../background/views/index'
import Goodlist from '../background/views/good'
import home from '../background/views/home'
import Adminuser from '../background/views/admin-user'
import User from '../background/views/user'
import Order from '../background/views/order'
import Judge_ad from '../background/views/judge'

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/index',
      component: Shoplist,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/person',
      component: Person
    },
    {
      path: '/judge',
      component: Judge
    },
    {
      name:'Detail',
      path: '/gooddetails/:goodid',
      component: Gooddetails
    },
    {
      name:'Goodtype',
      path: '/goodtype/:typeid',
      component: Goodtype
    },
    {
      path: '/shoppingcar',
      component: ShoppingCar
    },
    {
      name:'Payout',
      path: '/Payout/:orderid',
      component: Payout
    },
    {
      path: '/Orderlist',
      component: Orderlist
    },
    {
      path: '/admin-index/login',
      component: loginad
    },
    {
      path: '/admin',
      redirect:'/admin-index/login',
      component: loginad
    },
    {
      path: '/admin-index',
      redirect:'/admin-index/home',
      component: index_ad,
      children: [
      	{
          path: '/admin-index/home',
          component: home
        },
        {
          path: '/admin-index/order',
          component: Order
        },
        {
          path: '/admin-index/goodlist',
          component: Goodlist
        },
        {
          path: '/admin-index/user',
          component: User
        },
        {
          path: '/admin-index/admin-user',
          component: Adminuser
        },
        {
          path: '/admin-index/judge-mangers',
          component: Judge_ad
        },
      ]
    },
  ]
})
