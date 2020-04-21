import {Booter} from "../../Booters";

class BooterTest implements Booter {

    public boot(_options: any){
    }

}

export function getBooterTest(): any{
    return BooterTest;
}
