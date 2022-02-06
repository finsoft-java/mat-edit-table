// An example of Entity
export interface Customer {
  id: number;                 // a NUMBER input, however not editable
  name: string;               // a common INPUT field
  surname: string;            // a common INPUT field
  age: number;                // a NUMBER input
  birthday: string|null;      // a Date, possibly null
  active: boolean;            // a CHECKBOX
  size: 'S'|'M'|'L';          // a SELECT
  notes?: string;             // a TEXTAREA, possibly undefined
  petImage: string|null;      // IMG with "data:" URL
  bestFriend: Customer|null;  // this is for testing the dot-notation
  friends: string[];          // a SELECT MULTIPLE
}
