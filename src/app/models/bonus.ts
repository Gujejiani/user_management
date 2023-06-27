import { MOBonusType } from './bonusType.enum';

export interface MOBonus {
  _id: string;
  userId?: number;
  type: MOBonusType;
  amount: number;
  currency?: 'GEL' | 'USD';
  iconName?: 'payments' | 'rocket' | 'stars' | 'euro';
}
