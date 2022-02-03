import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatEditTableComponent } from './ngx-mat-edit-table.component';

describe('NgxMatEditTableComponent', () => {
  let component: NgxMatEditTableComponent;
  let fixture: ComponentFixture<NgxMatEditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatEditTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
