<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'O campo nome é obrigatório!',
          ]"
        />

        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'O campo e-mail é obrigatório!',
          ]"
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          type="password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'O campo password é obrigatório!',
          ]"
        />

        <div class="full-width q-guitter-y-sm">
          <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
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

import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",

  setup() {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotify();
    const { register } = useAuthUser();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess();
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
