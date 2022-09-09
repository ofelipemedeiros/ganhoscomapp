<template>
  <q-page padding>
    <h3>Seja bem vindo!</h3>
    <q-btn
            label="Logar"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/login"
          />


  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
