<script setup lang="ts">
import { DateTime } from "luxon";
import PostWriter from "../components/PostWrite.vue";
import { Post, TimeLinePost } from "../posts";
import { usePosts } from "../stores/postsStore";
import { useUsers } from "../stores/userStore";
import { useCurrentInstance } from "../use-current-instance";

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

async function createNewPost(post: Post) {
  await posts.createPost(post);
  vm.$router.push("/");
}
</script>

<template>
  <PostWriter :post="post" @submit="createNewPost($event)" />
</template>
