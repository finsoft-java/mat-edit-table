import { Component } from '@angular/core';
import { ColumnDefinition } from 'ngx-mat-edit-table';
import { Customer } from './Customer';
import { MockCustomerService } from './mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  columns: ColumnDefinition<Customer>[] = [
    {
      title: 'ID',
      data: 'id',
      type: 'number',
      disabled: 'ALWAYS',
      width: '10%'
    },
    {
      title: 'Name',
      data: 'name',
      type: 'input',
      width: '20%'
    },
    {
      title: 'Surname',
      data: 'surname',
      type: 'input',
      width: '20%'
    },
    {
      title: 'Birthday',
      data: 'birthday',
      type: 'date',
      width: '10%'
    },
    {
      title: 'Active yet?',
      data: 'active',
      type: 'checkbox',
      width: '10%'
    },
    {
      title: 'Size',
      data: 'size',
      type: 'select',
      options: [{
        value: 'S',
        label: 'Small'
      },{
        value: 'M',
        label: 'Medium'
      },{
        value: 'L',
        label: 'Large'
      }],
      width: '10%'
    },
    {
      title: 'Notes',
      data: 'notes',
      type: 'textarea',
      width: '20%',
      render: (x: string) => x == null ? '' : x.substring(0, 30),
      cellTitle: (x: string) => x
    },
  ];

  constructor(public service: MockCustomerService) {
  }


}
