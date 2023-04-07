<script lang="ts" setup>
import { Status } from "../validation";

defineProps<{
  name: string;
  modelValue: string;
  status: Status;
  type: string;
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
    <div v-if="!status.valid" class="is-danger help">
      {{ status.message }}
    </div>
  </div>
</template>
