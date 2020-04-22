import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {BaseModulesDefiner} from '../BaseModulesDefiner';
import {BooterList} from '../../Booters/BooterList/BooterList';
// import {Booter} from "../../Booters/Booter";
import {ModulesDefiner} from '../ModulesDefiner';
import {CurliApplication} from '../../CurliApplication';
import {EVENTS_NAMES} from '../../Events';

export class BootersModulesDefiner extends BaseModulesDefiner implements ModulesDefiner {

    protected bootersList: BooterList | undefined = undefined;

    public getName (): string {
        return 'BooterModulesDefiner';
    }

    public ini (): void {
        this.bootersList = new BooterList();
    }

    public whenCallMethodInModules (): ApplicationEventsType {
        return 'after:services';
    }

    public getMethodName (): string {
        return 'registerBooters';
    }

    public callMethodInModules (module: ModuleBase): void {
        module.registerBooters(this);
    }

    public registerBooter<T> (BooterClass: {new (app: CurliApplication): any}, options?: T) {
        const booter = new BooterClass(this.app);
        (this.bootersList as BooterList).add(booter, options);
    }

    public boot () {
        (this.bootersList as BooterList).boot();
    }

    public afterCalledModules (): void {
        this.app.emit(EVENTS_NAMES.BOOTING_BOOTERS);
        this.boot();
    }

}
