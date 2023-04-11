<script setup lang="ts">
import { usePostsQuery } from "../entities/post";
import TimeLine from "../entities/post/components/TimeLine.vue";

const postsQuery = usePostsQuery();
</script>

<template>
  <Suspense>
    <template #default>
      <TimeLine v-if="postsQuery.data" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
