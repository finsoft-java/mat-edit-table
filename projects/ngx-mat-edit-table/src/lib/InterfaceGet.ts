import { ListBean } from "./ListBean";

/**
 * A service implementing some kind of fetch (probably a GET from a webservice), used to populate records.
 * 
 * Service MUST return an object ListBean, that includes both a filtered list and a count of all non-filtered records
 * 
 * For server-side pagination, a "skip" and a "top" parameters will be passed to the method.
 * 
 * For server-side search, a "search" parameter will be passed.
 */
export interface Get<T> {
    getAll(parameters: any): Promise<ListBean<T>>;
}