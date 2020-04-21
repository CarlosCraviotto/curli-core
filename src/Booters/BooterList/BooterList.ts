import {BooterItem} from './BooterItem';
// import {CurliApplication} from "../../CurliApplication";
import {Booter} from '../Booter';

export class BooterList {

    protected readonly list: Array<BooterItem>;

    constructor () {
        this.list = [];
    }

    public add<T> (booter: Booter, options?: T) {
        const booterItem = new BooterItem(booter, options);
        this.list.push(booterItem);
    }

    public boot (): void {
        this.list.forEach(async (booter: BooterItem) => {
            await booter.boot();
        });
    }

}
