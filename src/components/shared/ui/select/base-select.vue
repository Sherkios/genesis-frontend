<template>
  <input-field class="base-select" :class="baseSelectClass">
    <template v-if="$slots['default']" #title><slot></slot></template>

    <template #default>
      <div ref="select-content" class="base-select__content">
        <div class="base-select__main" @click="changeActiveState(!isOpen)">
          <div class="base-select__name">{{ currentName }}</div>

          <div class="base-select__arrow-wrapper">
            <arrow-down-icon class="base-select__arrow" />
          </div>
        </div>

        <div class="base-select__options">
          <template v-for="(item, idx) in options" :key="idx">
            <div
              v-if="'name' in item"
              class="base-select__option"
              :class="{ 'base-select__option_current': item.value === model }"
              @click="choseOption(item.value)"
            >
              <approve-icon class="base-select__approve"></approve-icon>
              {{ item.name }}
            </div>
          </template>
        </div>
      </div>
    </template>
  </input-field>
</template>

<script setup lang="ts" generic="option">
import ApproveIcon from "components/shared/icons/approve-icon.vue";

import ArrowDownIcon from "components/shared/icons/arrow-down-icon.vue";
import InputField from "components/shared/ui/input-field.vue";
import { IOption } from "components/shared/ui/select/types";
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

defineOptions({
  name: "base-select",
});

const props = defineProps<{
  options: IOption<option>[];
  disabled?: boolean;
}>();

const baseSelectClass = computed(() => [{ "base-select_active": isOpen.value }]);

const model = defineModel();

const isOpen = ref<boolean>(false);

const currentName = computed((): string => {
  let element: IOption<option> | undefined;

  for (const item of props.options) {
    if (item.value === model.value) {
      element = item;
      break;
    }
  }

  if (element) {
    return element.name;
  } else {
    return "Значение не выбрано";
  }
});

const contentRef = useTemplateRef("select-content");

const choseOption = (value: option): void => {
  for (const item of props.options) {
    if (item.value === value) {
      model.value = value;
    }
  }

  changeActiveState(false);
};

const changeActiveState = (state: boolean): void => {
  if (props.disabled && state) {
    return;
  }

  isOpen.value = state;
};

const closeSelect = (event: Event): void => {
  const target: HTMLElement = event.target as HTMLElement;
  const parent: HTMLElement | null = target.closest(".base-select__content");

  if (isOpen.value && parent !== contentRef.value) {
    changeActiveState(false);
  }
};

onMounted(() => {
  document.documentElement.addEventListener("click", closeSelect);
});

onUnmounted(() => {
  document.documentElement.removeEventListener("click", closeSelect);
});
</script>

<style lang="scss">
:root {
  --select-border-color: transparent;
  --select-color: var(--text-color);
  --select-background-color: var(--background-color);
  --select-main-padding-vertical: 4px;
  --select-main-padding-horizontal: 8px;
  --select-main-padding: var(--select-main-padding-vertical) var(--select-main-padding-horizontal);
  --select-icon-color: var(--primary-color);

  --option-background-color: var(--white);
  --option-current-background-color: var(--text-color);
  --option-title-color: var(--secondary-color);
  --option-color: var(--select-color);
  --option-current-color: var(--secondary-color);
  --option-hover-color: var(--text-hover-color);
}
.base-select {
  // width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;

  color: var(--text-foregound-color);
  font-size: 14px;
  line-height: 20px;

  &_active {
    & .base-select__arrow {
      transform: rotateX(180deg);
    }

    & .base-select__options {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

  &_filter {
    & .base-select__main {
      justify-content: flex-start;
      --select-background-color: var(--contrast);
      --select-border-color: var(--border-color);
    }

    & .base-select__options {
      left: auto;
      right: 0;
      min-width: 240px;

      @media (max-width: 540px) {
        min-width: auto;
      }
    }
  }

  &__title {
    color: var(--secondary);
  }

  &__content {
    position: relative;
    width: 100%;
  }

  &__main {
    position: relative;
    width: 100%;
    min-height: 1lh;

    padding: var(--select-main-padding);

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border: 1px solid var(--select-border-color);
    border-radius: 6px;

    background-color: var(--select-background-color);

    transition: all 0.5s ease;

    cursor: pointer;
  }

  &__name {
    color: var(--select-color);
    min-height: 1lh;
  }

  &__arrow-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 32px;
    height: 100%;
    padding-right: 16px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      var(--select-background-color) 60%,
      var(--select-background-color) 100%
    );
  }

  &__arrow {
    height: 1em;
    transition: all 0.3s ease;
    --icon-fill: var(--select-icon-color);
  }

  &__options {
    position: absolute;
    z-index: 10;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    max-height: 40vh;
    box-sizing: border-box;

    // padding: 2px;

    border: 1px solid var(--border-color);
    border-radius: 6px;

    background-color: var(--white);

    opacity: 0;
    visibility: hidden;

    transform: translateY(-5px);

    transition: all 0.3s ease;

    overflow: auto;
  }

  &__option {
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 6px 12px;
    color: var(--option-color);
    background-color: var(--option-background-color);

    transition: all 0.2s ease;

    cursor: pointer;

    &:hover {
      --option-color: var(--option-hover-color);
    }

    &_current {
      --option-color: var(--option-current-color);
      background-color: var(--option-current-background-color);

      & .base-select__approve {
        opacity: 1;
      }

      &:hover {
        --option-color: var(--option-current-color);
      }
    }
  }

  &__approve {
    --icon-stroke: var(--option-color);
    width: 1em;
    opacity: 0;

    transition: all 0.2s ease;
  }
}
</style>
