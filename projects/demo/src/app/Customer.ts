// An example of Entity
export interface Customer {
  id: number;
  name: string;
  surname: string;
  age: number;
  birthday: string|null;
  active: boolean;
  size: 'S'|'M'|'L';
  notes: string|null;
  petImage: string|null;
}
