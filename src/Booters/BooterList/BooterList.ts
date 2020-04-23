import {BooterItem} from './BooterItem';
import {Booter} from 'curli-types';

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
