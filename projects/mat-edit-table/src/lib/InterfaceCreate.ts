/**
 * A service implementing creation of given row (probably a POST to a webservice)
 * 
 * Service must return the object, that could have been modified server-side
 */
 export interface Create<T> {
    create(object: T): Promise<T>;
}