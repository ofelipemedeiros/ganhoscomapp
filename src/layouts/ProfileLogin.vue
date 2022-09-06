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



export default defineComponent({
  name: "ProfileLogin",

  setup() {
    const { logout } = useAuthUser()

    const deslogar = async ()=>{
      await logout()
    }

    return {
      deslogar
    };

  },
});
</script>
