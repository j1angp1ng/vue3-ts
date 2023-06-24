import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta:{
          isShow:true,
          title:'商品列表'
        },
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component: () => import('../views/UsersView.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        meta:{
          isShow:true,
          title:'角色列表'
        },
        component: () => import('../views/RoleView.vue')
      },
      {
        path: 'authority/:id/:authority',
        name: 'authority',
        meta:{
          isShow:false,
          title:'权限列表'
        },
        component: () => import('../views/AuthorityView.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局前置路由守卫
router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token');
  if(!token && to.path!=='/login'){
    next('login')
  }else{
    next();
  }
});

export default router
