import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {BaseModulesDefiner} from '../BaseModulesDefiner';
import {BooterList} from '../../Booters/BooterList/BooterList';
import {ModulesDefiner} from 'curli-types';
import {BooterClass} from 'curli-types';
import {EVENTS_NAMES} from '../../Events';

export class BootersModulesDefiner extends BaseModulesDefiner implements ModulesDefiner {

    protected bootersList: BooterList | undefined = undefined;

    public getName (): string {
        return 'BooterModulesDefiner';
    }

    public beforeCallModules (): void {
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

    public registerBooter<T> (booterClass: BooterClass, options?: T) {
        const booter = new booterClass(this.app);
        (this.bootersList as BooterList).add(booter, options);
    }

    public boot () {
        (this.bootersList as BooterList).boot();
    }

    public afterCallModules (): void {
        this.app.emit(EVENTS_NAMES.BOOTING_BOOTERS);
        this.boot();
    }

}
