import { route } from 'quasar/wrappers'
import useAuthUser from 'src/composables/useAuthUser'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useRouter } from "vue-router";
import useSupabase from 'src/boot/supabase'

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
  Router.beforeEach(async (to, from) => {
    const {supabase} = useSupabase()
     const currentUser = supabase.auth.user()
     const requiAuth = to.matched.some(record => record.meta.requiAuth)
     console.log(to)
     console.log(to.hash)
     console.log('current user', currentUser)
     console.log(to.fullPath)
    if (
      // make sure the user is authenticated
      currentUser &&
      // ❗️ Avoid an infinite redirect
      to.name == 'login'
    ) {
      // redirect the user to the login page
      return { name: 'me' }
    }
  })
  // Router.beforeEach((to,from,next)=>{
  //   const {supabase} = useSupabase()
  //   const currentUser = supabase.auth.user()
  //   const requiAuth = to.matched.some(record => record.meta.requiAuth)
  //   console.log(to)
  //   console.log(to.hash)
  //   console.log('current user', currentUser)
  //   console.log(to.fullPath)
  //   if(

  //   ){

  //   }

  //   // if( requiAuth && !currentUser) next('login')
  //   // else if (!requiAuth && currentUser) next('me')
  //   // else next();

  // })

  return Router
})
