import { Injectable } from '@angular/core';
import { ListBean, Create, Get, Update, Delete } from 'ngx-mat-edit-table';
import { Customer } from './Customer';

@Injectable({ providedIn: 'root' })
export class MockCustomerService implements Get<Customer>, Create<Customer>, Update<Customer>, Delete<Customer> {
  constructor() { }

  internalList: Customer[] = [
    {
      id: 1,
      name: 'Mickey',
      surname: 'Mouse',
      age: 16,
      birthday: '2006-02-20',
      active: true,
      size: 'S'
    },
    {
      id: 2,
      name: 'Donkey',
      surname: 'Kong',
      age: 33,
      birthday: '2005-02-20',
      active: false,
      size: 'L'
    },
    {
      id: 3,
      name: 'Mickey',
      surname: 'Mouse',
      age: 16,
      birthday: '2006-02-20',
      active: true,
      size: 'S'
    },
    {
      id: 4,
      name: 'Goofy',
      surname: '-',
      age: 16,
      birthday: '2006-02-21',
      active: true,
      size: 'L'
    }
  ];

  getAll(filter?: any): Promise<ListBean<Customer>> {
    // Mock: return elements in internal list
    return new Promise((resolve, reject) => {
      resolve({
        data: this.internalList,
        count: this.internalList.length
      });
    });
  }

  create(obj: Customer): Promise<Customer> {
    // Mock: assign new key, add to internal list, then return modified object
    return new Promise((resolve, reject) => {
      let max = Math.max(...this.internalList.map(x => x.id));
      if (max == null) max = 0;
      obj.id = max + 1;
      this.internalList.push(obj);
      resolve(obj);
    });
  }

  update(obj: Customer): Promise<Customer> {
    // Mock: update in internal list, then return unchanged object
    return new Promise((resolve, reject) => {
      const idx = this.internalList.findIndex(x => x.id == obj.id);
      this.internalList[idx] = obj;
      resolve(obj);
    });
  }

  delete(obj: Customer): Promise<void> {
    // Mock: delete from internal list
    return new Promise((resolve, reject) => {
      const idx = this.internalList.findIndex(x => x.id == obj.id);
      this.internalList.splice(idx, 0);
      resolve();
    });
  }
}
