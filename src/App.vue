<template>
  <page-block class="app">
    <container-block class="app__container">
      <section-block class="app__section">
        <template #section-block-title>Выберите сущность</template>

        <template #default>
          <div class="app__form">
            <base-select v-model="model" :options>Сущность</base-select>

            <base-button :disabled="isDisabled" :is-loading @click="create">Создать</base-button>

            <div v-if="isError" class="app__error">
              {{ error }}
            </div>
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
  if (!isLoading.value) {
    isLoading.value = true;

    hideError();

    if (isEssenceType(model.value)) {
      const response = await store.createEssence(model.value);

      if (response instanceof Error) {
        error.value = response.message;
        showError();
      }
      isLoading.value = false;
    }
  }
};

const isError = ref<boolean>(false);
const error = ref<string>("");

const showError = () => {
  isError.value = true;
};

const hideError = () => {
  isError.value = false;
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

  &__error {
    color: var(--negative-color);
  }
}
</style>
