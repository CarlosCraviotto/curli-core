
import {CurliApplication} from "../CurliApplication";

export class BaseModulesDefiner {

    public constructor(protected app: CurliApplication) {
        this.app.log('starting:servicesModules:' + this.constructor.name)
    }

}
