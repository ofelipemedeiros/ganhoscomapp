<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-toolbar-title>
          Ganhos aplicativos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileLogin',

  setup () {
    return {
    }
  }
})
</script>
