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

export default defineComponent({
  name: "ProfileLogin",

  setup() {
    const store = perfilStore()
    const nomePerfil = store.dadosPerfil.full_name
    const avatarPerfil = store.dadosPerfil.avatar_url
    return {
      nomePerfil,
      avatarPerfil

    };
  },
});
</script>
