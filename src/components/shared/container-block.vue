<template>
  <div class="container-block">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "container-block",
});
</script>

<style lang="scss" scoped>
.container-block {
  width: 100%;
  padding: 0 40px;
}
</style>
