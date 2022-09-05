import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/useAuthUser";
//import { perfilStore } from 'stores/perfilUsuario';

const supabaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase  = createClient(supabaseURL, supabaseKey)

supabase.auth.onAuthStateChange((event, session) =>{
    const { user } = useAuthUser()
    //const store = perfilStore()
    user.value = session.user.user_metadata.name || null
    //store.dadosPerfil = session.user.user_metadata
    console.log('displayname', session.user.user_metadata.name)
    //console.log(user)

})


export default function useSupabase(){
    return { supabase }
}
