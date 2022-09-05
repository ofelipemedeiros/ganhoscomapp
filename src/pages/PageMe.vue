<template class>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Olá, {{ user }}</p>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageMe",

  setup() {
    const { user } = useAuthUser();
    const { notifyError } = useNotify();



    return {
      user,
    };
  },
});
</script>
