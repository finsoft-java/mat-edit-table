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
      birthday: new Date(),
      active: true,
      size: 'S'
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
    // Mock: add to internal list, then return unchanged object
    return new Promise((resolve, reject) => {
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
      this.internalList.splice(idx, 1);
      resolve();
    });
  }
}
