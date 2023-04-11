<script setup lang="ts">
import { usePosts } from "../entities/post";
import TimeLine from "../entities/post/components/TimeLine.vue";

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
