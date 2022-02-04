
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

  /** input type: either HTML5 input type (text/number/email/date/hidden, ...)
   * or select/textarea/checkbox
   * or combo(=input+select)
   * 
   * Default is text.
   * 
   * not all HTML 5 input types have been checked. "file" is not suposed to work so far.
   */
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
  onChange?: (value: any, col: ColumnDefinition<T>, row: T) => void;

  /** Default value during insert */
  defaultValue?: any;

  /** Input text placeholder */
  placeholder?: string;

  /** Render function for tooltip over cell */
  cellTitle?: (data: any, row?: T, rowNum?: number) => string | null;
}
