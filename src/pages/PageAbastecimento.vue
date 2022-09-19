<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmit">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.data_despesa">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.data_despesa" :locale="localidade">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="form.fk_combustivel"
          :options="opcao_tipo_combustivel"
          emit-value
          map-options
          label="Tipo  de Combustivel"
        >
          <template v-slot:before>
            <q-icon name="mdi-gas-station" />
          </template>
        </q-select>
        <q-input
          color="teal"
          v-model="form.valor_despesa"
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
  name: "PageAbastecimento",
  components: {

  },
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const { supabase } = useSupabase();
    const table = "despesas";
    const router = useRouter();
    const { post } = useApi();
    const { user } = useAuthUser();

    const form = ref({
      data_despesa:'',
      user_id: user.id,
      fk_combustivel: null,
      valor_despesa: null,


    });

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        notifySuccess("Combustivel adicionado!");
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
      opcao_tipo_combustivel: [
        {
          label: 'Gasolina Comum',
          value: 1
        },
        {
          label:  'Gasolina Aditivada',
          value: 2
        },
        {
          label:  'Etano Comum',
          value: 3
        },
        {
          label: "Etanol Aditivado",
          value: 4
        },
        {
          label: 'Diesel',
          value: 5
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
