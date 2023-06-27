import { MOGender } from 'src/app/models';
export interface MOToSieve {
  gender: MOGender | null;
  hasBonus: boolean;
  sieveType: 'filter' | 'sort';
}
