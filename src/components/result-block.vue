<template>
  <section-block class="result-block">
    <template #section-block-title>Сущности</template>

    <template #default>
      <div class="result-block">
        <div class="result-block__item">
          <div class="result-block__header">ID</div>
          <div class="result-block__header">Название</div>
        </div>
        <template v-for="essence in essences" :key="essence.id">
          <div class="result-block__item">
            <div class="result-block__id">{{ essence.id }}</div>
            <div class="result-block__name">{{ essence.name }}</div>
          </div>
        </template>
      </div>
    </template>
  </section-block>
</template>

<script setup lang="ts">
import SectionBlock from "components/shared/section-block.vue";
import { IEssence } from "store/types";

SectionBlock;
defineOptions({
  name: "result-block",
});

defineProps<{ essences: IEssence[] }>();
</script>

<style lang="scss" scoped>
.result-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__item {
    padding: 8px;
    display: flex;
    gap: 8px;

    &:nth-child(2n) {
      background-color: var(--background-color);
    }

    & > *:first-child {
      width: 20%;
    }

    & > *:last-child {
      width: 80%;
    }
  }

  &__header {
    font-size: 20px;
    font-weight: 600;
  }

  &__id {
  }

  &__name {
  }
}
</style>
