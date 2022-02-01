import { Observable } from 'rxjs';

/**
 * An interface for 
 */
export interface LabelValue {
  label: string;
  value: any;
}

/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition<T> {
  /** Column title */
  title: string;

  /** Attribute name */
  data?: string;

  /** input type: text/number/date/hidden/select/... or combo(=input+select) */
  type?: string;

  /** width style property */
  width?: string;

  /** style classes for cells */
  cellClasses?: string | string[];

  /** render function */
  render?: (data: any, row?: T, rowNum?: number, colNum?: number) => string | null;

  /** select options */
  options?: LabelValue[];

  /** Function to load options ansynchronously */
  asyncOptions?: (row?: T) => Observable<LabelValue[]>;

  /** If the filed is enabled or disabled furing create or update*/
  disabled?: 'NO' | 'ALWAYS' | 'UPDATE';

  /** onChange callback function */
  onChangeCallback?: (event: Event) => void;

  defaultValue?: T;
}
