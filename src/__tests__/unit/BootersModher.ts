import {Booter} from 'curli-types';

class BooterTest implements Booter {

    public boot (_options: any) {
    }

}

export function getBooterTest (): any {
    return BooterTest;
}
