import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Naruto from '../views/Naruto.vue'
import NarutoShippuden from '../views/NarutoShippuden.vue'
import Episode from '../views/Episode.vue'
import Arc from '../views/Arc.vue'
import Admin from '../views/Admin.vue'
import EditEpisode from '../views/EditEpisode.vue'
import EditArc from '../views//EditArc.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/naruto',
    name: 'Naruto',
    component: Naruto
  },
  {
    path: '/naruto-shippuden',
    name: 'Naruto Shippuden',
    component: NarutoShippuden
  },
  {
    path: '/episode/:id',
    name: 'Episode',
    component: Episode,
    props: true
  },
  {
    path: '/arc/:id',
    name: 'Arc',
    component: Arc,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/episode/:id',
    name: 'EditEpisode',
    component: EditEpisode,
    props: true
  },
  {
    path: '/admin/arc/:id',
    name: 'EditArc',
    component: EditArc,
    props: true
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(_, _2, _3){
    return {top: 0, left: 0}
  }
})

export default router
