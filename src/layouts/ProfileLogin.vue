<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>  </q-toolbar-title>
        <q-btn flat round dense icon="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import { perfilStore } from "stores/perfilUsuario"


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
