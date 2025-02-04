<template>
  <button class="base-button" :disabled>
    <template v-if="!isLoading">
      <slot></slot>
    </template>

    <loader-icon v-if="isLoading" class="base-button__loader"></loader-icon>
  </button>
</template>

<script setup lang="ts">
import LoaderIcon from "components/shared/icons/loader-icon.vue";

defineOptions({
  name: "base-button",
});

withDefaults(
  defineProps<{
    disabled?: boolean;
    isLoading?: boolean;
  }>(),
  {
    disabled: false,
    isLoading: false,
  },
);
</script>

<style lang="scss">
.base-button {
  --icon-fill: var(--button-color);

  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;

  color: var(--button-color);
  background-color: var(--primary-color);

  border: 1px solid var(--primary-dark-color);
  border-radius: 4px;

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:disabled {
    --button-color: var(--text-color);
    background-color: var(--white);
    border: 1px solid var(--border-color);
    cursor: default;
  }

  &__loader {
    height: 2em;
    width: 100%;
  }
}
</style>
