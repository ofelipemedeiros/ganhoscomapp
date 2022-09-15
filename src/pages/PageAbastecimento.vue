<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmit">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.data_combustivel">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.data_combustivel" :locale="localidade">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-model="form.tipo_combustivel"
          :options="opçõesCombus"
          label="Tipo  de Combustivel"
        >
          <template v-slot:before>
            <q-icon name="mdi-gas-station" />
          </template>
        </q-select>
        <q-input
          color="teal"
          v-model="form.valor_combustivel"
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
    const table = "abastecimentos";
    const router = useRouter();
    const { post } = useApi();
    const { user } = useAuthUser();

    const form = ref({
      tipo_combustivel: null,
      valor_combustivel: null,
      user_id: user.id,
      data_combustivel:''
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
      opçõesCombus: ["Gasolina Comum", "Gasolina Aditivada", "Gasolina Premium", "Etanol", "Diesel"],
      form,
      handleSubmit,
    };
  },
});
</script>

<style>
</style>
