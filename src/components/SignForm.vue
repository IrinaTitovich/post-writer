<script setup lang="ts">
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

const username = ref("");
const userNameStatus = computed(() =>
  validate(username.value, [required, minmaxLength({ max: 15, min: 3 })])
);

const password = ref("");
const passwordStatus = computed(() =>
  validate(password.value, [required, minmaxLength({ max: 20, min: 10 })])
);

const isInvalid = computed(
  () => !userNameStatus.value.valid || !passwordStatus.value.valid
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
      data-testid="user-name"
      name="Username"
      v-model="username"
      :status="userNameStatus"
      type="text"
    />
    <FormInput
      data-testid="user-password"
      name="Password"
      v-model="password"
      :status="passwordStatus"
      type="password"
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
