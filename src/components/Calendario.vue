<template>
  <q-input  v-model="data">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
            v-model="data"
            :locale="localidade"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>



<script>
export default {
  name: 'Calendario',
  props: {
    data:{
      type: String,
      required: true
    }

  },
  data(){
    return {
      date: ('12/09/2022'),
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
    }
  }

}
</script>
