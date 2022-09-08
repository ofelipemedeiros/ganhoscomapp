import { route } from 'quasar/wrappers'
import useAuthUser from 'src/composables/useAuthUser'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useRouter } from "vue-router";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to)=>{
    const router = useRouter();
    const { isLoggedIn } = useAuthUser()
    console.log(to)
    console.log(to.accessToken)
     if(to.hash.accessToken!==null){

       return{ name: 'me' }
     }

    if (
      to.hash.includes('type=recovery')  &&
      to.name !== 'resetPassword'

    ){
      const accessToken = to.hash.split('&')[0]
      const token = accessToken.replace('#access_token=', '')
      return { name: 'resetPassword', query: { token }}
      console.log(token)

    }

    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes('fromEmail')){
      return { name: 'login'}

    }
  })

  return Router
})
