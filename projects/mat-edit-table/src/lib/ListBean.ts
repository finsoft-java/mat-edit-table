/**
 * An object that represents a page of data.
 * data may be filtered in some way, either because of pagination or because of some search filter;
 * count is the total number of items, considering filter, but not considering pagination.
 */
export interface ListBean<T> {
    data: T[];
    count?: number;
}
