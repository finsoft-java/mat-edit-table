// An example of Entity
export interface Customer {
  id: number;
  name: string;
  surname: string;
  age: number;
  birthday: Date;
  active: boolean;
  size: 'S'|'M'|'L';
}