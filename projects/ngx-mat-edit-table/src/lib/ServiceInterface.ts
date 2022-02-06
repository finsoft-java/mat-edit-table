import { ListBean } from "./ListBean";

export interface ServiceInterface<T> {

    /**
     * A service implementing some kind of fetch (probably a GET from a webservice), used to populate records.
     * 
     * Service MUST return an object ListBean, that includes both a filtered list and a count of all non-filtered records
     * 
     * For server-side pagination, a "skip" and a "top" parameters will be passed to the method.
     * 
     * For server-side search, a "search" parameter will be passed.
     */
    getAll(parameters: any): Promise<ListBean<T>>;

    /**
     * A service implementing creation of given row (probably a POST to a webservice)
     * 
     * Service must return the object, that could have been modified server-side
     */
    create?(object: T): Promise<T>;

    /**
     * A service implementing update of given row (probably a PUT to a webservice)
     * 
     * Service must return the object, that could have been modified server-side
     */
    update?(object: T): Promise<T>;

    /**
     * A service implementing deletion of given row (probably a DELETE to a webservice)
     */
    delete?(object: T): Promise<any>;

    // TODO: upload, download
}