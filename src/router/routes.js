
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/IndexPage.vue') },
       { path: '', name: 'loginDefault', component: () => import('pages/PageLogin.vue') },
       { path: 'login', name: 'login', component: () => import('src/pages/PageLogin.vue') },
       { path: 'register', name: 'register', component: () => import('src/pages/Register.vue') },
       { path: 'recuperar', name: 'recuperar', component: () => import('src/pages/ForgotPassword.vue') },
       { path: 'email-confirmation', name: 'email-confirmation', component: () => import('src/pages/PageEmailConfirmation.vue') },
       { path: 'resetPassword', name: 'resetPassword', component: () => import('src/pages/ResetPassword.vue') }
    ]
  },


  {
    path: '/',
    component: () => import('layouts/ProfileLogin.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('src/pages/PageMe.vue') }

      //{ path: '', component: () => import('pages/Index.vue') }
    ],
    meta:{
      requiresAuth: true
    },
  },
  {
    path: '/',
    component: () => import('layouts/Ganhos.vue'),
    children: [
      { path: 'ganhos', name: 'ganhos', component: () => import('src/pages/PageGanhos.vue') }

      //{ path: '', component: () => import('pages/Index.vue') }
    ],
    meta:{
      requiresAuth: true
    },
  },
  {
    path: '/',
    component: () => import('layouts/AbastecimentoL.vue'),
    children: [
      { path: 'abastecimento', name: 'abastecimento', component: () => import('src/pages/PageAbastecimento.vue') }

      //{ path: '', component: () => import('pages/Index.vue') }
    ],
    meta:{
      requiresAuth: true
    },
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLogin.vue'),
    children: [
      { path: 'profile', name: 'profile', component: () => import('src/pages/PageProfile.vue') }
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
