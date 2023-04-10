<script setup lang="ts">
import { usePosts, TimeLine } from "../entities/post";

const postsStore = usePosts();
</script>

<template>
  <Suspense>
    <template #default>
      <TimeLine v-if="postsStore" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
