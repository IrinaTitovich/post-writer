<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useUsers, useModal } from "../../entities/user";

const modal = useModal();

const userStore = useUsers();

const router = useRouter();

const logoutUserMutation = useMutation(userStore.logout, {
  onSuccess: () => {
    router.push({ path: "/" });
  },
});
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.currentUserId" class="buttons">
        <progress
          v-if="logoutUserMutation.isLoading.value"
          class="progress is-primary"
          :style="{ width: '500px' }"
        />
        <template v-else>
          <RouterLink
            data-testid="new-post"
            to="/posts/new"
            class="button is-link"
          >
            New Post
          </RouterLink>
          <button
            data-testid="log-out"
            class="button"
            @click="logoutUserMutation.mutate()"
          >
            Log out
          </button>
        </template>
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
