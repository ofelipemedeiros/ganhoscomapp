<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">Resetar Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nova Senha"
          v-model="password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Campo obrigatório, deve conter 6 ou mais caracteres',
          ]"
        />

        <div class="full-width q-guitter-y-sm">
          <q-btn
            label="Resetar"
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
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const { resetPassword } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;
    const password = ref("");

    const handleResetPassword = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess("Senha modificada com sucesso!!");
        router.push({ name: "login" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      handleResetPassword,
    };
  },
});
</script>
