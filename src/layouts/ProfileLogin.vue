<template>
  <q-layout view="lHh Lpr lFf">
    <q-tabs
        v-model="tab"
        inline-label
        class="text-teal"
      >
        <q-tab name="Hoje"  label="Hoje" />
        <q-tab name="7dias" label="7 Dias" />
        <q-tab name="30dias" label="30 dias" />
        <q-tab name="todoperiodo" label="Todo periodo" />
      </q-tabs>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab
          v-model="fabRight"
          vertical-actions-align="right"
          color="primary"
          glossy
          external-label
          icon="add_chart"
          direction="up"
        >
          <q-fab-action
            label-position="left"
            color="accent"
            icon="mdi-cash-register"
            label="Outras Despesas"
          />
          <q-fab-action
            label-position="left"
            color="orange"
            to="/abastecimento"
            icon="mdi-gas-station"
            label="Abastecimento"
          />
          <q-fab-action
            label-position="left"
            color="secondary"
            icon="mdi-oil"
            label="Manutenção"
          />
          <q-fab-action
            label-position="left"
            color="primary"
            to="/ganhos"
            icon="mdi-cash-multiple"
            label="Ganho"
          />
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
import PageMe from "src/pages/PageMe.vue";




export default defineComponent({
  name: "ProfileLogin",
  components: {
    PageMe,

  },

  setup() {
    const router = useRouter()
    const { logout, user } = useAuthUser()

    const deslogar = () =>{
      user.value = null
      logout()
      router.push({name: 'login'})



    }

    return {
      deslogar,
      tab: ref('mails')
    };

  },
});
</script>
