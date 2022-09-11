<template>
  <q-layout view="lHh Lpr lFf">
    <q-header  >
      <q-toolbar class="col-xs-12">
        <q-btn push padding="0px" icon="arrow_back" flat  to="/me"/>
        <q-toolbar-title>Ganhos</q-toolbar-title>
        <q-space/>
        <q-btn flat round dense icon="logout" @click="deslogar" />
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
  name: 'Ganhos',



})
</script>
