
import {Booter} from '../Booter';

export class BooterItem {

    public constructor (private booter: Booter, private options?: any) {}

    public async boot () {
        await this.booter.boot(this.options);
    }

}
