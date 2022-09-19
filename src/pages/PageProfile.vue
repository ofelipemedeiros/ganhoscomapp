<template>
  <div class="column">
    <div class="col">
      <q-tabs v-model="currentTab" inline-label class="bg-grey-3 text-teal">
        <q-tab name="Hoje" label="Hoje" />
        <q-tab name="7dias" label="7 Dias" />
        <q-tab name="30dias" label="30 dias" />
        <q-tab name="todoperiodo" label="Todo periodo" />
      </q-tabs>
    </div>

    <div class="col">
      <q-tab-panels v-model="currentTab" animated>
        <!--primeiro tab-->
        <q-tab-panel name="Hoje">
          <q-timeline layout="comfortable" color="secondary">
            <q-timeline-entry
              v-for="dado in dados"
              :key="dado.id"
              :title="dado.tipo_receitas.nome_tipo_receita"
              :subtitle="dado.data_receitas"
              icon="mdi-cash"
            >
              <div>
                {{ dado.aplicativos.nome_app }}
              </div>
              <div>
                {{ dado.valor_receitas }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-tab-panel>
        <!--segundo  tab-->
        <q-tab-panel name="7dias">
          Ganhos de 7dias

        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
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
    const { list, listReceitas } = useApi();
    const loading = ref(true);
    const dados = ref([]);

    const loadDados = async () => {
      try {
        loading.value = true;
        dados.value = await listReceitas("receitas");
        loading.value = false;
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
      currentTab: ref("Hoje"),
    };
  },
});
</script>
