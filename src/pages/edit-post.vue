<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCurrentInstance } from "../shared/composables/use-current-instance";
import { Post, usePosts } from "../entities/post";
import PostWrite from "../entities/post/components/PostWrite.vue";

const route = useRoute();
const id: string = typeof route.params.id === "string" ? route.params.id : "";

const postsStore = usePosts();
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with id=${id} was not found`);
}

const { vm } = useCurrentInstance();

async function onEditPost(post: Post) {
  await postsStore.updatePost(post);
  await postsStore.fetchPosts();
  vm.$router.push("/");
}
</script>

<template>
  <PostWrite :post="post" @submit="onEditPost($event)" />
</template>
