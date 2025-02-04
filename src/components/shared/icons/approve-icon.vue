<template>
  <svg class="approve-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g id="checkmark">
      <line class="cls-1" x1="3" x2="12" y1="16" y2="25" />
      <line class="cls-1" x1="12" x2="29" y1="25" y2="7" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: "approve-icon",
});
</script>

<style lang="scss" scoped>
.approve-icon {
  & line {
    stroke: var(--icon-stroke);
    stroke-width: 3;
  }
}
</style>
