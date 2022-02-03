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
      disabled: 'UPDATE',
      width: '40%'
    },
    {
      title: 'Name',
      data: 'name',
      type: 'input',
      width: '40%'
    },
    {
      title: 'Surname',
      data: 'surname',
      type: 'input',
      width: '40%'
    },
    {
      title: 'Active yet?',
      data: 'active',
      type: 'checkbox',
      width: '10%'
    },
    {
      title: 'Size',
      data: 'surname',
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
      width: '40%'
    }
  ];

  constructor(public service: MockCustomerService) {
  }

  ngOnInit(): void {
    // TODO load data
  }


}
