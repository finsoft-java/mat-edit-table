
/**
 * An interface for Label/Value pairs, such as SELECT OPTION's
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

  /** Attribute name. */
  data: string;

  /** input type: text/number/date/hidden/select/... or combo(=input+select) */
  type?: string;

  /** width style property. @see conditionalFormatting */
  width?: string;

  /** render function. Useful e.g. for dates or for concatenating fields */
  render?: (data: any, row?: T, rowNum?: number) => string | null;

  /** select options */
  options?: LabelValue[];

  /** Function to re/load options in a combo during search */
  reloadOptions?: (row?: T) => Promise<LabelValue[]>;

  /** If the filed is enabled or disabled furing create or update*/
  disabled?: 'NO' | 'ALWAYS' | 'UPDATE';

  /** onChange callback function */
  onChange?: (value: string, col: ColumnDefinition<T>, row: T) => void;

  /** Default value during insert */
  defaultValue?: T;
}
