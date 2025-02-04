<template>
  <section class="section-block">
    <div v-if="$slots['section-block-title']" class="section-block__title">
      <slot name="section-block-title"></slot>
    </div>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "section-block",
});
</script>

<style lang="scss" scoped>
.section-block {
  padding: 16px 20px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 8px;
  border-color: 3px solid var(--border-color);

  background-color: var(--white);

  &__title {
    font-size: 24px;
  }
}
</style>
