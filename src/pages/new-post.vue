<script setup lang="ts">
import { DateTime } from "luxon";
import { usePosts, Post, TimeLinePost, PostWrite } from "../entities/post";
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

async function createNewPost(post: Post) {
  await posts.createPost(post);
  await posts.fetchPosts();

  vm.$router.push("/");
}
</script>

<template>
  <PostWrite :post="post" @submit="createNewPost($event)" />
</template>
