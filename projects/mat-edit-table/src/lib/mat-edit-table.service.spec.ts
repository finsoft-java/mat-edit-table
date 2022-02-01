import { TestBed } from '@angular/core/testing';

import { MatEditTableService } from './mat-edit-table.service';

describe('MatEditTableService', () => {
  let service: MatEditTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatEditTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
