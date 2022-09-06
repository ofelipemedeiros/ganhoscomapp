<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-avatar>
          <img :src="avatarPerfil" />
        </q-avatar>
        <q-toolbar-title> {{ nomePerfil }} </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import { perfilStore } from 'stores/perfilUsuario'
import useAuthUser from "src/composables/useAuthUser";

export default defineComponent({
  name: "ProfileLogin",

  setup() {
    const nomePerfil = ''
    const avatarPerfil = ''
    const { isLoggedIn } = useAuthUser();

    const loadPerfil = async()=>{
      await isLoggedIn
      nomePerfil = store.dadosPerfil.full_name
      avatarPerfil = store.dadosPerfil.avatar_url
    }

    const store = perfilStore()
    return {
      loadPerfil,
      nomePerfil,
      avatarPerfil


    };
  },
});
</script>
