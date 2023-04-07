<script setup lang="ts">
import { NewUser } from "../user";
import { useUsers } from "../stores/userStore";
import { useModal } from "../composables/modal";
import { default as SignForm } from "./SignForm.vue";

const userStore = useUsers();
const modal = useModal();

async function onSubmit(newUser: NewUser) {
  try {
    await userStore.createUser(newUser);
    modal.hideModal();
  } catch {
    console.warn(newUser);
  }
}
</script>

<template>
  <SignForm data-testid="sign-up-form" @submit="onSubmit($event)" />
</template>

<style>
.form {
  width: 500px;
  background-color: white;
  margin-top: 50px;
  padding: 50px;
}
</style>
