<script setup lang="ts">
import { useRoute } from "vue-router";
import PostWriter from "../components/PostWrite.vue";
import { Post } from "../posts";
import { router } from "../router";
import { usePosts } from "../stores/postsStore";

const route = useRoute();
const id: string = typeof route.params.id === "string" ? route.params.id : "";

const postsStore = usePosts();
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with id=${id} was not found`);
}

async function onEditPost(post: Post) {
  await postsStore.updatePost(post);
  await postsStore.fetchPosts();
  router.push("/");
}
</script>

<template>
  <PostWriter :post="post" @submit="onEditPost($event)" />
</template>
