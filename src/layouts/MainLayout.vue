<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>


        <q-toolbar-title>
          Ganhos com aplicativos
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'




export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {


    return {

    }
  }
})
</script>
