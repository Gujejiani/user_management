import { MOBonus } from './bonus';
import { MOGender } from './gender';

// MO stands for models, to be easily searchable..
export interface MOUser {
  _id: string;
  name: string;
  lastName: string;
  gender: MOGender;
  idNumber: number;
  phoneNumber: number;
  address: string;
  photo: any;
  bonuses: Array<MOBonus>;
}
