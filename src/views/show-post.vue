<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { Post } from "../posts";
import { usePosts } from "../stores/postsStore";
import { useUsers } from "../stores/userStore";

const route = useRoute();
const id: string = typeof route.params.id === "string" ? route.params.id : "";

const postsStore = usePosts();
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with id=${id} was not found`);
}

const usersStore = useUsers();

const isEdittable = computed(() => {
  if (!usersStore.currentUserId) {
    return false;
  }

  if (post.authorId !== usersStore.currentUserId) {
    return false;
  }

  return true;
});

watch(isEdittable, (isw) => isw);
</script>

<template>
  <div class="columns">
    <div class="column" />
    <div v-if="post" class="column is-two-thirds">
      <RouterLink
        v-if="isEdittable"
        :to="`/posts/${post.id}/edit`"
        class="is-link button is-rounded"
      >
        Edit Post
      </RouterLink>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column" />
  </div>
</template>
