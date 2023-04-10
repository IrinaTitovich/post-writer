<script setup lang="ts">
import { default as DepartmentDetailsView } from "./TimelineItem.vue";
import { periods } from "../constants";
import { usePosts } from "../store/postsStore";

const postsStore = usePosts();
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
  </nav>

  <DepartmentDetailsView
    v-for="post in postsStore.filteredPosts"
    :key="post.id"
    :post="post"
  />
</template>
