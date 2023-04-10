<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimelineItem",
});
</script>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { TimeLinePost } from "..";

defineProps<{
  post: TimeLinePost;
}>();
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>
