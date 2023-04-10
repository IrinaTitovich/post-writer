<script setup lang="ts">
import { NewUser } from "../user";
import { useUsers } from "../store/userStore";
import { useModal } from "../composables/modal";
import { default as SignForm } from "./SignForm.vue";
import { ref } from "vue";

const userStore = useUsers();
const modal = useModal();
const error = ref<string>();

async function onSubmit(newUser: NewUser) {
  try {
    await userStore.signIn(newUser);

    userStore.checkAutentification();
    modal.hideModal();
  } catch (e) {
    error.value = "Incorrect user";
  }
}
</script>

<template>
  <SignForm
    data-testid="sign-in-form"
    @submit="onSubmit($event)"
    :error="error"
  />
</template>

<style>
.form {
  width: 500px;
  background-color: white;
  margin-top: 50px;
  padding: 50px;
}
</style>
