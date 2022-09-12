<template>
  <q-page class="flex flex-center">
    <div>
      <q-table title="Treats" :rows="dados" :columns="columns" row-key="id" :loading="loading"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import useApi from "src/composables/useApi";

export default defineComponent({
  name: "PageMe",

  setup() {
    const { user } = useAuthUser();
    const { notifyError } = useNotify();
    const { list } = useApi();
    const loading = ref(true)
    const dados = ref([]);
    const columns = [
      {
        name: "tipoGanho",
        align: "center",
        label: "Tipo Ganho",
        field: "tipoGanho",
        sortable: true,
      },
      { name: "nomeGanho", label: "Nome Ganho", field: "nomeGanho", sortable: true },
      { name: "valorGanho", label: "Valor Ganho", field: "valorGanho" },
    ];
    const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  }]

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
      columns,
      rows,
      dados,
    };
  },
});
</script>
