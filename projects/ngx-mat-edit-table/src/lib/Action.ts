export interface Action<T> {
    /** Button HTML "title" property */
    title: string;
    /** Material icon name */
    icon: string;
    /** Material color name (primary/secondary/...) may be empty */
    color: string;
    /** Callback function */
    onClick: (row: T) => any;
}