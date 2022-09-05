
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/IndexPage.vue') },
      { path: '', name: 'loginDefault', component: () => import('pages/PageLogin.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/PageLogin.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('src/pages/PageEmailConfirmation.vue') },
      { path: 'ForgotPassword', name: 'ForgotPassword', component: () => import('src/pages/PageForgotPassword.vue') },
      { path: 'resetPassword', name: 'resetPassword', component: () => import('src/pages/PageResetPassword.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'register', name: 'register', component: () => import('src/pages/PageRegister.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLogin.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/PageMe.vue') },

      //{ path: '', component: () => import('pages/Index.vue') }
    ],
    meta:{
      requiresAuth: true
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
