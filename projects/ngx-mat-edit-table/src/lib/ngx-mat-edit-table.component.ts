import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatEditTableLabels } from './MatEditTableLabels';
import { ColumnDefinition } from './ColumnDefinition';
import { Get } from './InterfaceGet';
import { Create } from './InterfaceCreate';
import { Delete } from './InterfaceDelete';
import { Update } from './InterfaceUpdate';
import { Action } from './Action';

@Component({
  selector: 'ngx-mat-edit-table',
  templateUrl: './ngx-mat-edit-table.component.html',
  styleUrls: ['./ngx-mat-edit-table.component.scss']
})
/**
 * Editable Material Table
 * @see https://muhimasri.com/blogs/create-an-editable-dynamic-table-using-angular-material/
 * @param T is the type of row objects
 */
export class NgxMatEditTableComponent<T> implements OnInit {
  @Input()
  labels: MatEditTableLabels = {
    add: 'New',
    edit: 'Edit',
    undo: 'Undo',
    delete: 'Delete',
    save: 'Save',
    refresh: 'Refresh',
    exportXlsx: 'Export XLSX',
    exportCsv: 'Export CSV',
    confirmDelete: 'Confirm?',
    chooseImg: 'Choose...',
    chooseFile: 'Choose...'
  };

  @Input()
  columns: ColumnDefinition<T>[] = [];

  /**
   * If the table is editable or not
   */
  @Input()
  editable = true;

  /**
   * GET webservice promise
   */
  @Input()
  getSvc?: Get<T>;
  /**
   * POST webservice promise
   */
   @Input()
  createSvc?: Create<T>;
  /**
   * PUT webservice promise
   */
   @Input()
  updateSvc?: Update<T>;
  /**
   * DELETE webservice promise
   */
   @Input()
  deleteSvc?: Delete<T>;

  /**
   * Pagination type, or none
   */
  @Input()
  pagination: 'client' | 'server' | null = null;
  /**
   * Pagination size options
   */
   @Input()
  pageSizeOptions: number[] = [5, 10, 20, 50];
  /**
   * Default pagination size
   */
   @Input()
  pageSize? = 10;

  @Input()
  /** Timeout in secondi */
  autorefresh?: number;

  /** Should button "Export XLSX" appear? */
  @Input()
  xlsxExportEnabled = true;
  /** Should button "Export CSV" appear? */
  @Input()
  csvExportEnabled = true;
  /** Name of exported XLSX file */
  @Input()
  xlsxExportFileName = 'Export.xlsx';
  /** Name of sheet inside exported XLSX file */
  @Input()
  xlsxExportSheetName = 'Data';
  /** Name of exported CSV file */
  @Input()
  csvExportFileName = 'Export.csv';

  /** A function returning css style for TD in Angular format, i.e. string or map */
  @Input()
  conditionalFormatting?: ((row: T) => any);

  /** Optional argument, more buttons that have to appear on each row */
  @Input()
  actions: Action<T>[] = [];

  @Output()
  create: EventEmitter<T> = new EventEmitter();
  @Output()
  update: EventEmitter<T> = new EventEmitter();
  @Output()
  delete: EventEmitter<T> = new EventEmitter();
  @Output()
  errorMessage: EventEmitter<any> = new EventEmitter();
  @Output()
  clickRow: EventEmitter<T> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild('tableFormRow') tableFormRow: any;

  // mat-table parameters:
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[] = [];

  // paginator parameters:
  paginatorLength ? = 0;
  pageIndex ? = 0;

  data: T[] = [];
  creating = false;
  editRowNumber = -1;
  oldRow: T = {} as T;
  buttonsEnabled = true;
  filtro: any = {};
  searchValue: any = {};

  ACTIONS_INDEX = '$$actions';

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    if (this.editable) {
      this.columns.push({
        // A column for actions
        data: this.ACTIONS_INDEX,
        title: '',
        type: ''
      });
    }
    this.columns.forEach(x => this.displayedColumns.push(x.data || ''));

    if (this.pagination !== null) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.pagination !== 'server') {
      this.pageIndex = undefined;
      this.pageSize = undefined;
    }

    this.getAll();

    if (this.autorefresh) {
      setInterval(() => {
        this.refresh();
      }, this.autorefresh * 1000);
    }
  }

  refresh(): void {
    console.log('Refreshing');
    if (this.pagination !== null) {
      this.pageIndex = 0;
    }
    this.getAll();
  }

  handlePageEvent(event: PageEvent): void {
    this.paginatorLength = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAll();
  }

  filter(filter: any): void {
    this.pageIndex = 0;
    this.filtro = filter;
    this.getAll();
  }

  getAll() {
    console.log('Fetching records...');
    this.buttonsEnabled = false;
    if (this.pagination === 'server') {
      this.filtro.skip = this.pageIndex && this.pageSize && this.pageIndex * this.pageSize;
      this.filtro.top = this.pageSize;
    }
    this.getSvc?.getAll(this.filtro).then(
      listBean => {
        this.dataSource.data = listBean.data;
        this.data = listBean.data;
        console.log(this.dataSource.data);
        this.buttonsEnabled = true;
        this.paginatorLength = listBean.count;
        console.log('Done.');
      },
      error => {
        this.buttonsEnabled = true;
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
      }
    );
  }

  /**
   * Get really all records, ignoring pagination. Intended for export.
   * @param callback function accepts a T[] argument
   */
  getReallyAll(callback: any) {
    const filtroSenzaPaginazione = { ...this.filtro };
    delete filtroSenzaPaginazione.skip;
    delete filtroSenzaPaginazione.top;
    return this.getSvc?.getAll(filtroSenzaPaginazione).then(
      listBean => {
        callback(listBean.data);
      },
      error => {
        this.buttonsEnabled = true;
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
      }
    );
  }

  renderCell(col: ColumnDefinition<T>, row: T, rowNum: number): string | null {
    if (!col.data) {
      return '';
    }
    const x = (row as any)[col.data];
    if (col.render) {
      return col.render(x, row, rowNum);
    }
    if (col.options) {
      const option = col.options.find(z => z.value === x);
      if (option) {
        return option.label;
      }
    }
    if (x == null) {
      return '';
    }
    return x;
  }

  cellTitle(col: ColumnDefinition<T>, row: T, rowNum: number): string | null {
    const x = (row as any)[col.data];
    return col.cellTitle ? col.cellTitle(x, row, rowNum) : '';
  }

  onInputChange(event: Event, col: ColumnDefinition<T>, row: T): void {
    const element = event.currentTarget as HTMLInputElement; // who knows what it is
    const { value } = element; // object destructuring
    if (col.onChange) {
      col.onChange(value, col, row);
    }
  }

  onCheckboxChange(event: MatCheckboxChange, col: ColumnDefinition<T>, row: T): void {
    if (col.onChange) {
      col.onChange(event.checked, col, row);
    }
  }

  onSelectChange(event: MatSelectChange, col: ColumnDefinition<T>, row: T): void {
    if (col.onChange) {
      col.onChange(event.value, col, row);
    }
  }

  onSearchChange(row: T, col: ColumnDefinition<T>, data: string): any {
    if (!col.data) {
      console.error('You are trying to set a column without .data attribute?!');
      return;
    }

    (row as any)[col.data!] = data;

    /* if (data.length <= 3) {
      // return or not return? this is the question
      return;
    } */

    if (col.reloadOptions) {
      col.reloadOptions(row).then(
        options => {
          console.log('Received options', options);
          col.options = options;
        }
      );
    }
  }

  beginCreate(): void {
    const newRow: any = {}; // newRow has ideally type T
    this.columns.forEach(c => {
      const attributeName = c.data;
      if (attributeName) {
        const value = (c.defaultValue !== undefined) ? c.defaultValue : null;
        newRow[attributeName] = value;
      }
    });
    this.data.unshift(newRow);
    this.dataSource.data = this.data;
    this.creating = true;
    this.beginEdit(0);
  }

  beginEdit(rowNum: number): void {
    this.editRowNumber = rowNum;
    console.log('Editing row', rowNum);
    const row = this.data[rowNum];
    Object.assign(this.oldRow, row);
    this.columns.forEach(
      col => {
        if (col.reloadOptions) {
          col.reloadOptions(row).then(
            options => {
              console.log('Received options', options);
              col.options = options;
            }
          );
        }
      }
    );
    this.columns.filter(col => col.type === 'combo').forEach(
      col => {
        if (col.data) {
          // can it exist a combo withut .data ?!?
          this.searchValue[col.data] = (row as any)[col.data];
        }
      }
    );

    // KNOWN BUG: focus works only in insert, not in update, because querySelectorAll() does not consider mat-select
    setTimeout(() => {
      const elm = this.tableFormRow.nativeElement.querySelectorAll('.tablefield:not(:disabled)');
      console.log('Selected elements:', elm);
      if (elm.length) {
        elm[0].focus();
      }
    }, 500);
  }

  isDisabled(col: ColumnDefinition<T>): boolean {
    return col.disabled != null && (col.disabled == 'ALWAYS' || (col.disabled == 'UPDATE' && !this.creating));
  }

  saveRow(rowNum: number): void {
    if (this.creating) {
      this.createRow(rowNum);
    } else {
      this.updateRow(rowNum);
    }
  }

  createRow(rowNum: number): void {
    this.buttonsEnabled = false;
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    console.log(this);

    this.createSvc?.create(row).then(
      response => {
        console.log('Emitting create row:', row);
        this.create.emit(row);
        Object.assign(row, response);
        this.buttonsEnabled = true;
        this.creating = false;
      },
      error => {
        this.editRowNumber = rowNum;
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
        this.buttonsEnabled = true;
        // creating remains true
      }
    );
  }

  updateRow(rowNum: number): void {
    this.buttonsEnabled = false;
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    console.log(this);
    this.updateSvc?.update(row).then(
      response => {
        console.log('Emitting update row:', row);
        this.update.emit(row);
        Object.assign(row, response);
        this.buttonsEnabled = true;
      },
      error => {
        this.editRowNumber = rowNum;
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
        this.buttonsEnabled = true;
      }
    );
  }

  deleteRow(rowNum: number): void {
    // I know, 'confirm' is bad...
    if (confirm(this.labels.confirmDelete)) {
      this.buttonsEnabled = false;
      this.editRowNumber = -1;
      const row = this.data[rowNum];
      this.deleteSvc?.delete(row).then(
        () => {
          this.data.splice(rowNum, 1);
          this.dataSource.data = this.data;
          console.log('Emitting delete row:', row);
          this.delete.emit(row);
          this.buttonsEnabled = true;
        },
        error => {
          console.log('Emitting error:', error);
          this.errorMessage.emit(error);
          this.buttonsEnabled = true;
        }
      );
    }
  }

  getConditionalFormatting(row: T): any {
    if (this.conditionalFormatting) {
      return this.conditionalFormatting(row);
    }
    return null;
  }

  undoChange(rowNum: number): void {
    console.log('Undo');
    this.editRowNumber = -1;
    if (this.creating) {
      this.data.splice(rowNum, 1);
      this.dataSource.data = this.data;
    } else {
      const row = this.data[rowNum];
      Object.assign(row, this.oldRow);
    }
    this.creating = false;
  }

  getSheetHeader(): any[] {
    const row: any[] = [];
    this.columns.forEach(col => {
      if (col.data !== this.ACTIONS_INDEX) {
        row.push(col.title);
      }
    });
    return row;
  }

  getSheetDataColumns(): any[] {
    const row: any[] = [];
    this.columns.forEach(col => {
      if (col.data !== this.ACTIONS_INDEX) {
        row.push(col.data);
      }
    });
    return row;
  }

  /**
   *  Transform an array T[] into a formatted array any[][]
   */
  getSheetMatrix(data: T[]): any[][] {
    const matrix: any[] = [];
    let rowNum = 0;
    data.forEach(row => {
      const matrixRow: any[] = [];
      this.columns.forEach(col => {
        if (col.data !== this.ACTIONS_INDEX) {
          matrixRow.push(this.renderCell(col, row, rowNum));
        }
      });
      matrix.push(matrixRow);
      ++rowNum;
    });
    return matrix;
  }

  createWorksheet(data: T[]): XLSX.WorkSheet {
    const header = [this.getSheetHeader()];
    // TODO how to style header?!?
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(header);
    XLSX.utils.sheet_add_aoa(ws, this.getSheetMatrix(data), { origin: -1 });
    return ws;
  }

  exportXlsx(): void {
    this.getReallyAll((data: T[]) => {
      const ws = this.createWorksheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, this.xlsxExportSheetName);
      XLSX.writeFile(wb, this.xlsxExportFileName);
    });
  }

  exportCsv(): void {
    this.getReallyAll((data: T[]) => {
      const ws = this.createWorksheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws, { FS: ';' });
      const blob = new Blob([csv], { type: 'text/csv;charset=UTF-8' });
      saveAs(blob, this.csvExportFileName);
    });
  }

  readB64Image($event: any, col: ColumnDefinition<T>, row: T): void {
    console.log($event);
    const file = $event?.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      console.log(evt);
      (row as any)[col.data] = evt.target?.result;
    }
    reader.readAsDataURL(file);
  }

  uploadFile($event: any, col: ColumnDefinition<T>, row: T): void {
    console.error('Not implemented (yet)');
  }
}
