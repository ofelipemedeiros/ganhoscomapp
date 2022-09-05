<template>
  <q-page padding>
    <p class="text-body1">Obrigado por se registrar!</p>

    <p class="text-body1">
      Por favor confirme seu e-mail para terminar o registro:
      <strong>{{ $route.query.email }}</strong>
    </p>
    <div
      class="
        full-width
        q-guitter-y-sm
        col-md-4 col-sm-6 col-xs-10
        row
        justify-center
      "
    >
      <q-btn
        label="Voltar"
        color="primary"
        class="full-width"
        rounded
        :to="{ name: 'login' }"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
