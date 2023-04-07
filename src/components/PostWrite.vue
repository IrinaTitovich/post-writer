<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { marked } from "marked";
import highlightsjs from "highlight.js";
import lodash from "lodash";
import { Post, TimeLinePost } from "../posts";
import { useUsers } from "../stores/userStore";

const props = defineProps<{
  post: TimeLinePost | Post;
}>();

const emit = defineEmits<{
  (event: "submit", post: Post): void;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();

onMounted(() => {
  if (!contentEditable.value) {
    throw new Error("Content Editable is not found");
  }
  contentEditable.value.innerText = content.value;
});

const onInput = () => {
  if (!contentEditable.value) {
    throw new Error("Content Editable is not found");
  }

  content.value = contentEditable.value.innerText;
};

const updateHtml = (value: string) => {
  marked.parse(
    value,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightsjs.highlightAuto(code).value;
      },
    },
    (_, parseResult) => {
      html.value = parseResult;
    }
  );
};

watch(
  content,
  lodash.debounce((contentValue) => updateHtml(contentValue), 300),
  { immediate: true }
);

const userStore = useUsers();

function onSaveChanges() {
  if (!userStore.currentUserId) {
    throw Error("user was not found");
  }

  const post: Post = {
    ...props.post,
    created:
      typeof props.post.created === "string"
        ? props.post.created
        : props.post.created.toISODate(),
    title: title.value,
    authorId: userStore.currentUserId,
    html: html.value,
    markdown: content.value,
  };

  emit("submit", post);
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">{{ post.title }}</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        id="contenteditable"
        contenteditable
        ref="contentEditable"
        @input="onInput"
      />
    </div>

    <div class="column">
      <div v-html="html" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="onSaveChanges">
        Save Post
      </button>
    </div>
  </div>
</template>

<style>
@import "highlight.js/styles/atom-one-dark.css";
</style>
