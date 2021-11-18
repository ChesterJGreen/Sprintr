import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    // children: [{
    //   path: 'backlog',
    //   name: 'Backlog',
    //   component: loadPage('ProjectDetails')
    // },
    // {
    //   path: 'sprint',
    //   name: 'Backlog',
    //   component: loadPage('ProjectDetails')
    // }
    // ],
    beforeEnter: authGuard
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/projects/:id',
    name: 'ProjectPage',
    component: loadPage('ProjectPage'),
    beforeEnter: authGuard,
    children: [{
      path: 'backlog',
      name: 'BacklogPage',
      component: loadPage('BacklogPage')
    },
    {
      path: 'sprints',
      name: 'SprintPage',
      component: loadPage('SprintPage')
    }
    ]
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
