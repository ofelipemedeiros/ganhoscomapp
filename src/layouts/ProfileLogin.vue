<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>  </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="deslogar" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { supabase } from 'boot/supabase'



export default defineComponent({
  name: "ProfileLogin",

  setup() {
    const { logout, user } = useAuthUser()

    const deslogar = () =>{
      user.value = null
      logout()


    }

    return {
      deslogar
    };

  },
});
</script>
