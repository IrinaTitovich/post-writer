<script setup lang="ts">
import { useRouter } from "vue-router";
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/userStore";

const modal = useModal();

const userStore = useUsers();

const router = useRouter();

async function logout() {
  await userStore.logout();
  router.push({ path: "/" });
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.currentUserId" class="buttons">
        <RouterLink data-testid="new-post" to="/posts/new" class="button">
          New Post
        </RouterLink>
        <button data-testid="log-out" class="button" @click="logout()">
          Log out
        </button>
      </div>

      <div v-else class="buttons">
        <button
          id="sign-up"
          data-testid="sign-up"
          class="button"
          @click="modal.showModal('sign-up')"
        >
          Sign Up
        </button>
        <button
          data-testid="sign-in"
          class="button"
          @click="modal.showModal('sign-in')"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
