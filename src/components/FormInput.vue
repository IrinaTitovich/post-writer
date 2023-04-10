<script lang="ts" setup>
defineProps<{
  name: string;
  modelValue: string;
  type: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        :type="type"
        :id="name"
        class="input"
        :value="modelValue"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).value ?? ''
          )
        "
      />
    </div>
    <div v-if="errorMessage" class="is-danger help">
      {{ errorMessage }}
    </div>
  </div>
</template>
