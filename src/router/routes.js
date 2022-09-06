
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/IndexPage.vue') },
      //{ path: '', name: 'loginDefault', component: () => import('pages/PageLogin.vue') },
      { path: '', name: 'login', component: () => import('src/pages/PageLogin.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('src/pages/PageEmailConfirmation.vue') },
      { path: 'resetPassword', name: 'resetPassword', component: () => import('src/pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'register', name: 'register', component: () => import('src/pages/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'recuperar', name: 'recuperar', component: () => import('src/pages/ForgotPassword.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLogin.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/PageMe.vue') },

      //{ path: '', component: () => import('pages/Index.vue') }
    ],
    meta:{
      requiresAuth: false
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
