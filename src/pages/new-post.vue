<script setup lang="ts">
import { DateTime } from "luxon";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { usePosts, TimeLinePost, POSTS_QUERY } from "../entities/post";
import PostWrite from "../entities/post/components/PostWrite.vue";
import { useUsers } from "../entities/user";
import { useCurrentInstance } from "../shared/composables/use-current-instance";

const userStore = useUsers();

if (!userStore.currentUserId) {
  throw Error("User was not found");
}

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
  authorId: userStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
};

const posts = usePosts();

const { vm } = useCurrentInstance();

const createPostMutation = useMutation(posts.createPost, {
  async onSuccess() {
    vm.$router.push("/");
  },
});
</script>

<template>
  <PostWrite
    :post="post"
    :is-loading="createPostMutation.isLoading.value"
    @submit="createPostMutation.mutate($event)"
  />
</template>
