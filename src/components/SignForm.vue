<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref } from "vue";
import FormInput from "./FormInput.vue";
import { minmaxLength, required, validate } from "../validation";
import { NewUser } from "../user";

defineProps<{
  error?: string;
}>();

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const { value: username, ...usernameValidation } = useField(
  ref(""),
  (value: string) => {
    const status = validate(value, [
      required,
      minmaxLength({ max: 15, min: 3 }),
    ]);

    if (!status.valid && status.message) {
      return status.message;
    }

    return true;
  }
);

const { value: password, ...passwordValidation } = useField(
  ref(""),
  (value: string) => {
    const status = validate(value, [
      required,
      minmaxLength({ max: 20, min: 10 }),
    ]);

    if (!status.valid && status.message) {
      return status.message;
    }

    return true;
  }
);

const isInvalid = computed(
  () =>
    Boolean(usernameValidation.errors.value.length) ||
    Boolean(passwordValidation.errors.value.length)
);

async function onSubmit() {
  if (isInvalid.value) {
    return;
  }

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  emit("submit", newUser);
}
</script>

<template>
  <form data-testid="sign-form" class="form" @submit.prevent="onSubmit()">
    <FormInput
      v-model="username"
      name="Username"
      data-testid="user-name"
      type="text"
      :error-message="
        usernameValidation.meta.dirty && usernameValidation.errorMessage.value
          ? usernameValidation.errorMessage.value
          : undefined
      "
    />
    <FormInput
      v-model="password"
      name="Password"
      data-testid="user-password"
      type="password"
      :error-message="
        passwordValidation.meta.dirty && passwordValidation.errorMessage.value
          ? passwordValidation.errorMessage.value
          : undefined
      "
    />
    <div v-if="error" class="is-danger help">
      {{ error }}
    </div>
    <button
      type="submit"
      :disabled="isInvalid"
      class="button is-primary"
      :class="{ 'is-warning': isInvalid }"
    >
      Submit
    </button>
  </form>
</template>

<style>
.form {
  width: 500px;
  background-color: white;
  margin-top: 50px;
  padding: 50px;
}
</style>
