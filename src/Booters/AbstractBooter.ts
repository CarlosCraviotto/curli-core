import {CurliApplication} from '../CurliApplication';
import {Booter} from './Booter';

export abstract class AbstractBooter implements Booter {

    public constructor (protected app: CurliApplication) {
    }

    public abstract boot<T>(options?: T): void;

}
