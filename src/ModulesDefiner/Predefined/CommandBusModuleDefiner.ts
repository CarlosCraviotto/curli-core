import {BusSync} from "curli-bus";

import {
    DependencyInjection,
    CurliApplication,
    ApplicationEvents,
    ModulesDefiner,
    Module
} from 'curli-types';

export const BUS_SERVICE_NAME = 'bus';

export class CommandBusModuleDefiner implements ModulesDefiner {

    private container: DependencyInjection | undefined = undefined;
    private bus: BusSync | undefined = undefined;

    public constructor(private app: CurliApplication) {
    }

    public getName(): string {
        return 'CommandBusModuleDefiner';
    }

    public beforeCallModules(): void {
        this.container = this.app.getContainer();
        this.registerServiceBus(this.container);

        this.bus = this.container.get(BUS_SERVICE_NAME);
    }

    public whenCallMethodInModules(): ApplicationEvents {
        return 'after:booters';
    }

    public getMethodName(): string {
        return 'registerCommandsBus';
    }

    public callMethodInModules(module: Module): void {
        module.registerCommandsBus(this.bus, this.container);
    }

    public  afterCallModules(): void {
    }

    private registerServiceBus(container: DependencyInjection) {
        container.registerService(
            BUS_SERVICE_NAME,
            [],
            BusSync
        );
    }

}
