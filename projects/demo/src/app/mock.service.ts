import { Injectable } from '@angular/core';
import { ListBean, Create, Get, Update, Delete } from 'ngx-mat-edit-table';
import { Customer } from './Customer';

@Injectable({ providedIn: 'root' })
/**
 * This mock service simulates a backend service. Here there is no webservice,
 * we just keep all objects inside an "internalList".
 */
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
      size: 'S',
      notes: null,
      petImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=='
    },
    {
      id: 2,
      name: 'Donkey',
      surname: 'Kong',
      age: 33,
      birthday: '2005-02-20',
      active: false,
      size: 'L',
      notes: null,
      petImage: null
    },
    {
      id: 3,
      name: 'Mickey',
      surname: 'Mouse',
      age: 16,
      birthday: null,
      active: true,
      size: 'S',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in lorem in enim sodales accumsan vitae ut metus. Aenean eu diam dapibus, iaculis lorem eget, fringilla tortor. Proin tincidunt, sem blandit euismod suscipit, nibh dolor aliquam orci, iaculis mattis lectus orci nec erat. Suspendisse arcu metus, gravida vel magna id, molestie molestie felis. Aenean mollis lorem sit amet congue mollis. Nulla consequat, quam non faucibus blandit, leo quam lobortis sapien, at elementum nisi enim eget quam. Fusce vulputate dolor eu quam convallis, quis molestie sapien malesuada. Vestibulum pharetra nisl et urna tincidunt feugiat. Proin risus dolor, pharetra sit amet finibus eu, suscipit quis arcu. Maecenas elementum rhoncus ligula ac scelerisque. Donec id massa commodo, euismod nibh nec, vestibulum nisi. Duis massa felis, blandit at arcu at, tempus sodales arcu.',
      petImage: null
    },
    {
      id: 4,
      name: 'Goofy',
      surname: '-',
      age: 16,
      birthday: '2006-02-21',
      active: true,
      size: 'L',
      notes: null,
      petImage: null
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
