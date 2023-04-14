<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { NewUser, useUsers } from "..";
import { useModal } from "../composables/modal";
import { default as SignForm } from "./SignForm.vue";

const userStore = useUsers();
const modal = useModal();

const signUpMutation = useMutation<void, Error, NewUser>(userStore.createUser);

async function onSubmit(newUser: NewUser) {
  try {
    await signUpMutation.mutateAsync(newUser);
    modal.hideModal();
  } catch {
    console.warn(newUser);
    // TODO error state
    // get rid of the store actions
  }
}
</script>

<template>
  <SignForm
    data-testid="sign-up-form"
    :error="signUpMutation.error.value?.message"
    :is-loading="signUpMutation.isLoading.value"
    @submit="onSubmit($event)"
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
