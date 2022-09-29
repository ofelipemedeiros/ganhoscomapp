<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="form.email" lazy-rules type="email" />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          type="password"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Logar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>

        <div class="full-width q-pt-md">
          <q-btn
            label="Logar com google"
            color="primary"
            class="full-width"
            outline
            rounded
            @click="loginWithSocialProvider"
          />
        </div>

        <div class="full-width">
          <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/register"
          />
        </div>

        <div class="full-width">
          <q-btn
            label="Recuperar Senha"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/recuperar"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotify();
    const { loginWithGoogle, isLoggedIn, login } = useAuthUser();
    const form = ref({
      email: "",
      password: "",
    });


    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "profile" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const loginWithSocialProvider = async () => {
      try {
        await loginWithGoogle("google");
      } catch (error) {}
    };

    return {
      form,
      handleLogin,
      isLoggedIn,
      loginWithSocialProvider,
    };
  },
});
</script>
