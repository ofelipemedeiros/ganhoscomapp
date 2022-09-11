<template>
  <q-page padding>
    <q-form class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.data">
          <template v-slot:before>
            <q-icon name="mdi-calendar-edit" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="form.data"
                  mask="YYYY/MM/DD"
                  :locale="localidade"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Selecionar"
                      color="primary"
                      flat
                    />
                    <q-btn
                      v-close-popup
                      label="Cancelar"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select
          v-model="form.tipoGanho"
          :options="opçõesGanho"
          label="Fonte do ganho"
        >
          <template v-slot:before>
            <q-icon name="mdi-cash" />
          </template>
        </q-select>
        <q-select
          v-model="form.nomeGanho"
          :options="opçõesApp"
          label="Fonte do ganho"
        >
          <template v-slot:before>
            <q-icon name="mdi-subdirectory-arrow-right" />
          </template>
        </q-select>
        <q-input
          color="teal"
          v-model="form.valorGanho"
          label="valor"
          type="number"
        >
          <template v-slot:before>
            <q-icon name="mdi-currency-usd" />
          </template>
        </q-input>
      </div>
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
    </q-form>
  </q-page>
</template>

  <script>
import { defineComponent, ref } from "vue";
import ProfileLogin from "src/layouts/ProfileLogin.vue";
import { useRouter } from "vue-router";

import useNotify from "src/composables/useNotify";
import { date } from "quasar";

export default defineComponent({
  name: "PageGanhos",
  setup() {
    const timeStamp = Date.now();
    const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
    const table = "ganhos";
    const router = useRouter();

    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      tipoGanho: null,
      nomeGanho: null,
      valorGanho: null,
      data: formattedString,
    });

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        console.log(form.value);
        notifySuccess("Adicionado com sucesso!");
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
        console.log(form.value);
      }
    };

    return {
      opçõesGanho: ["Aplicativos", "Corrida Particular", "Gorjeta", "Outros"],
      opçõesApp: ["Uber", "99pop", "indriver"],
      formattedString,
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
      form,
      handleSubmit,
    };
  },
  components: { ProfileLogin },
});
</script>

  <style>
</style>
