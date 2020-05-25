import {Module} from 'curli-types';

class ModuleServiceTest implements Module {

    public registerServices (_container: any) {
    }

    public registerBooters (_container: any) {
    }
    public registerConfig (_container: any) {
    }
    public registerEventsSubscribers (_busService: any) {
    }

    public getName (): string {
        return 'ModuleServiceTest';
    }

}

export function getModuleServiceTest () {
    return ModuleServiceTest;
}
