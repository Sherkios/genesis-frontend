<template>
  <div class="input-field">
    <span v-if="$slots['title']" class="input-field__title">
      <slot name="title"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "input-field",
});
</script>

<style lang="scss" scoped>
.input-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__title {
    color: var(--secondary-color);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    transition: all 0.5s ease;
  }
}
</style>
