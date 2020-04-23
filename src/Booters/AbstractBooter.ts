import {Booter, CurliApplication} from 'curli-types';

export abstract class AbstractBooter implements Booter {

    public constructor (protected app: CurliApplication) {
    }

    public abstract boot<T>(options?: T): void;

}
