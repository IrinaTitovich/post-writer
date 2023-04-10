<script setup lang="ts">
import Timeline from "../components/Timeline.vue";
import { usePosts } from "../entities/post";

const postsStore = usePosts();
</script>

<template>
  <Suspense>
    <template #default>
      <Timeline v-if="postsStore" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
