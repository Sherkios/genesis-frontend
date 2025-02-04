export type TEssenceType = 1 | 2 | 3;

export interface IServerEssence {
  id: number;
  type: TEssenceType;
}

export type TEssenceName = "Компания" | "Сделка" | "Контакт";

export interface IEssence extends IServerEssence {
  name: TEssenceName;
}

export interface IEssenceCreateResponse {
  type: TEssenceType;
  id: number;
  status: number;
}
