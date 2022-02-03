/**
 * A service implementing deletion of given row (probably a DELETE to a webservice)
 */
export interface Delete<T> {
    delete(object: T): Promise<any>;
}