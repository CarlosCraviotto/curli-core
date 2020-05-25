import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {BaseModulesDefiner} from '../BaseModulesDefiner';

import {ModulesDefiner} from 'curli-types';
import {EventBus} from 'curli-bus';
import {DependencyInjection} from "curli-types/index";

export const EVENT_BUS_SERVICE_NAME = 'eventBus';

export class EventBusModulesDefiner extends BaseModulesDefiner implements ModulesDefiner {
    private container: DependencyInjection | undefined = undefined;
    protected eventsBus: EventBus | undefined = undefined;

    public getName (): string {
        return 'EventBusModulesDefiner';
    }

    public beforeCallModules (): void {
        this.container = this.app.getContainer();
        this.registerService(this.container);

        this.eventsBus = this.container.get(EVENT_BUS_SERVICE_NAME);
    }

    public whenCallMethodInModules (): ApplicationEventsType {
        return 'after:services';
    }

    public getMethodName (): string {
        return 'registerEventsSubscribers';
    }

    public callMethodInModules (module: ModuleBase): void {
        module.registerEventsSubscribers(this.eventsBus);
    }

    public afterCallModules (): void {
    }

    private registerService(container: DependencyInjection) {
        container.registerService(
            EVENT_BUS_SERVICE_NAME,
            [],
            EventBus
        );
    }

}
