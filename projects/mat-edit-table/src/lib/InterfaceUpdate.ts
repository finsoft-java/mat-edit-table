/**
 * A service implementing update of given row (probably a PUT to a webservice)
 * 
 * Service must return the object, that could have been modified server-side
 */
 export interface Update<T> {
    update(object: T): Promise<T>;
}