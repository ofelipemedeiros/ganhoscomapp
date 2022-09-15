<template>
  <q-page class="flex flex-center">
    <div>
      <q-timeline layout="comfortable" color="secondary" >

      <q-timeline-entry v-for="dado in dados" :key="dado.id"
        :title="dado.tipoGanho"
        :subtitle="dado.dataGanho"
        icon="mdi-cash"
      >
        <div>
          {{dado.nomeGanho}}
        </div>
        <div>
          {{dado.valorGanho}}
        </div>

      </q-timeline-entry>
      </q-timeline>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import useApi from "src/composables/useApi";

export default defineComponent({
  name: "PageProfile",

  setup() {
    const { user } = useAuthUser();
    const { notifyError } = useNotify();
    const { list } = useApi();
    const loading = ref(true)
    const dados = ref([]);

    const loadDados = async () => {
      try {
        loading.value = true
        dados.value = await list("ganhosteste");
        loading.value = false
        console.log(dados.value);
      } catch (error) {
        notifyError(error.message);
      }
    };
    onMounted(() => {
      loadDados();
    });
    return {
      user,
      loading,
      onMounted,
      dados,
    };
  },
});
</script>
