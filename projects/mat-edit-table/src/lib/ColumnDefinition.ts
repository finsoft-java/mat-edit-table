import { Observable } from 'rxjs';

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
  /** Attribute name. Compulsory. However it is not required that the object contain such an attribute. */
  data: string;
  /** input type: text/number/date/hidden/select/... or combo(=input+select) */
  type?: string;
  /** width style property */
  width?: string;
  /** render function */
  render?: (data: any, row?: T, rowNum?: number, colNum?: number) => string | null;
  /** select options */
  options?: LabelValue[];
  /** Function to load options ansynchronously */
  asyncOptions?: (row?: T) => Observable<LabelValue[]>;
  /** If the filed is enabled or disabled furing create or update*/
  disabled?: 'NO'|'ALWAYS'|'UPDATE';
  /** onChange callback function */
  onChangeCallback?: (event: Event) => void;
}
