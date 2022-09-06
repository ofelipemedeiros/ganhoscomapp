<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-avatar>

        </q-avatar>
        <q-toolbar-title> {{nomePerfil}} </q-toolbar-title>
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
    const nomePerfil = store.dadosPerfil.full_name
    const avatarPerfil = store.dadosPerfil.avatar_url
    const store = perfilStore()


    return {
      nomePerfil,
      avatarPerfil
    };

  },
});
</script>
