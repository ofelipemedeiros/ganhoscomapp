<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleSubmit">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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
import  useApi  from 'src/composables/useApi'
import { useRouter } from 'vue-router'
import useSupabase from 'src/boot/supabase'
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";

export default defineComponent({
  name: "PageGanhos",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const { supabase } = useSupabase()
    const table  = 'ganhosteste'
    const router = useRouter()
    const { post } = useApi()
    const { user } = useAuthUser()

    const form = ref({
      tipoGanho: null,
      nomeGanho: null,
      valorGanho: null,
      user_id: user.id
    });

    const handleSubmit = async () => {
      try {
        await post(table, form.value);
        notifySuccess('Ganho adicionado com sucesso!')
        console.log(form.value)

        router.push({ name: "me" });
      } catch (error) {

        console.log(error.message);
      }
    };

    return {
      opçõesGanho: ["Aplicativos", "Corrida Particular", "Gorjeta", "Outros"],
      opçõesApp: ["Uber", "99pop", "indriver"],
      form,
      handleSubmit
    };
  },
});
</script>

<style>
</style>
