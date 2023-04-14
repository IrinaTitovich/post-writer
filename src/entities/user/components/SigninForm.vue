<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { NewUser } from "../user";
import { useUsers } from "../store/userStore";
import { useModal } from "../composables/modal";
import { default as SignForm } from "./SignForm.vue";

const userStore = useUsers();
const modal = useModal();

const signInMutation = useMutation<unknown, Error, NewUser>(userStore.signIn);

async function onSubmit(newUser: NewUser) {
  try {
    await signInMutation.mutateAsync(newUser);

    userStore.checkAutentification();
    modal.hideModal();
  } catch (e) {
    console.warn("Incorrect user");
    // TODO error state
    // get rid of the store actions
  }
}
</script>

<template>
  <SignForm
    data-testid="sign-in-form"
    :error="signInMutation.isError.value ? 'Invalid user' : undefined"
    :is-loading="signInMutation.isLoading.value"
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
