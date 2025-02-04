import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { amoApi } from "services/api/amo-api";
import {
  IEssence,
  IEssenceCreateResponse,
  IServerEssence,
  TEssenceName,
  TEssenceType,
} from "store/types";
import { computed, ref } from "vue";

export const useEssenceStore = defineStore("essence", () => {
  const _essences = ref<IServerEssence[]>([]);

  const essences = computed<IEssence[]>(() =>
    _essences.value.map(essence => {
      let name: TEssenceName = "Сделка";

      switch (essence.type) {
        case 1:
          name = "Сделка";
          break;

        case 2:
          name = "Контакт";
          break;

        case 3:
          name = "Компания";
          break;

        default:
          break;
      }

      return {
        ...essence,
        name,
      };
    }),
  );

  const createEssence = async (type: TEssenceType) => {
    try {
      const response: AxiosResponse<IEssenceCreateResponse> = await amoApi.post("essence", {
        type,
      });

      const { status, ...essence } = response.data;

      _essences.value.push(essence);
    } catch (error) {
      return error;
    }
  };

  return {
    _essences,
    essences,
    createEssence,
  };
});
