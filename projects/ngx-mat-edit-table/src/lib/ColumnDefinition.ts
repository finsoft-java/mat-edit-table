
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
   * or b64image(=img+file, expected as b64 string)
   * 
   * Default is text.
   * 
   * Not all HTML 5 input types have been tested. "file" is not suposed to work so far.
   */
  type?: string;

  /** 
   * Cell width style property.
   */
  width?: string;

  /**
   * ngStyle property. It can be a string or a map.
   * @see also NgxMatEditTableComponent.conditionalFormatting
  */
  style?: any;

  /**
   * Render function. Useful e.g. for dates or for concatenating fields
   * You can render HTML code as well, e.g. render some image instead of state strings
   */
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

  /** 
   * Image ngStyle property. Consider setting max-width / max-height.
   */
  imgStyle?: { [klass: string]: any};
}
