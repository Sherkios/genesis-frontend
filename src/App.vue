<template>
  <page-block class="app">
    <container-block class="app__container">
      <section-block class="app__section">
        <template #section-block-title>Выберите механизм</template>

        <template #default>
          <div class="app__form">
            <base-select v-model="model" :options>Механизм</base-select>

            <base-button :disabled="isDisabled" :is-loading @click="create">Создать</base-button>
          </div>
        </template>
      </section-block>

      <result-block :essences></result-block>
    </container-block>
  </page-block>
</template>

<script setup lang="ts">
import ResultBlock from "components/result-block.vue";
import ContainerBlock from "components/shared/container-block.vue";
import PageBlock from "components/shared/page-block.vue";
import SectionBlock from "components/shared/section-block.vue";
import BaseButton from "components/shared/ui/button/base-button.vue";
import BaseSelect from "components/shared/ui/select/base-select.vue";
import { IOption } from "components/shared/ui/select/types";
import { storeToRefs } from "pinia";
import isEssenceType from "services/validations/is-essence-type";
import { useEssenceStore } from "store/useEssenceStore";
import { computed, ref } from "vue";

const options: IOption<number>[] = [
  {
    name: "Не выбрано",
    value: 0,
  },
  {
    name: "Сделка",
    value: 1,
  },
  {
    name: "Контакт",
    value: 2,
  },
  {
    name: "Компания",
    value: 3,
  },
];

const model = ref<number>(0);

const isDisabled = computed<boolean>(() => model.value === 0);
const isLoading = ref<boolean>(false);

const store = useEssenceStore();

const { essences } = storeToRefs(store);

const create = async () => {
  isLoading.value = true;
  if (isEssenceType(model.value)) {
    await store.createEssence(model.value);
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.app {
  padding: 20px 0;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
