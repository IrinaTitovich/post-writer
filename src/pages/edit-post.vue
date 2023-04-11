<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useCurrentInstance } from "../shared/composables/use-current-instance";
import { Post, usePosts, POSTS_QUERY } from "../entities/post";
import PostWrite from "../entities/post/components/PostWrite.vue";

const route = useRoute();
const id: string = typeof route.params.id === "string" ? route.params.id : "";

const postsStore = usePosts();
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with id=${id} was not found`);
}

const { vm } = useCurrentInstance();

const createPostMutation = useMutation(postsStore.updatePost, {
  async onSuccess() {
    vm.$router.push("/");
  },
});
</script>

<template>
  <!-- TODO progressbar -->
  <PostWrite
    :post="post"
    :is-loading="createPostMutation.isLoading.value"
    @submit="createPostMutation.mutate($event)"
  />
</template>
