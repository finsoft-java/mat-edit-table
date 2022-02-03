import { TestBed } from '@angular/core/testing';

import { NgxMatEditTableService } from './ngx-mat-edit-table.service';

describe('NgxMatEditTableService', () => {
  let service: NgxMatEditTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatEditTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
