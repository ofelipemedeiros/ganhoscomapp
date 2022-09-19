<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmit">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.data_receitas">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.data_receitas" :locale="localidade">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="form.fk_tipo_receita"
          :options="opcao_tipoReceita"
          emit-value
          map-options
          label="Tipo Receita"
        >
          <template v-slot:before>
            <q-icon name="mdi-cash" />
          </template>
        </q-select>
        <q-select
          v-model="form.fk_app"
          :options="opcao_App"
          emit-value
          map-options

          label="Fonte do ganho"
        >
          <template v-slot:before>
            <q-icon name="mdi-subdirectory-arrow-right" />
          </template>
        </q-select>
        <q-input
          color="teal"
          v-model="form.valor_receitas"
          label="valor"
          type="number"
        >
          <template v-slot:before>
            <q-icon name="mdi-currency-usd" />
          </template>
        </q-input>
        <div class="full-width q-pt-md">
          <q-btn
            label="Adicionar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useApi from "src/composables/useApi";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";


export default defineComponent({
  name: "PageGanhos",
  components: {

  },
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const { supabase } = useSupabase();
    const table = "receitas";
    const router = useRouter();
    const { post } = useApi();
    const { user } = useAuthUser();

    const form = ref({
      fk_tipo_receita: null,
      fk_app: null,
      valor_receitas: null,
      user_id: user.id,
      data_receitas:''
    });

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        notifySuccess("Ganho adicionado com sucesso!");
        router.push({ name: "profile" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      localidade: {
        days: "Domingo_Segunda_Terça_quarta_quinta_sexta_sabado_domingo".split(
          "_"
        ),
        daysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        months:
          "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
            "_"
          ),
        monthsShort: "Jan_Fev_Marc_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split(
          "_"
        ),
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: "dias",
      },
      opcao_tipoReceita: [{
        label: 'Aplicativo',
        value: 1
      },
      {
        label: 'Corrida Particular',
        value: 2
      },
    {
      label:  'Gorjeta',
      value: 3
    },
    {
      label:  'Outros',
      value: 4
    }],
      opcao_App: [
        {
          label: 'Uber',
          value: 1
        },
        {
          label: 'Indriver',
          value: 2
        },
        {
          label: '99pop',
          value: 3
        }
      ],
      form,
      handleSubmit,
    };
  },
});
</script>

<style>
</style>
