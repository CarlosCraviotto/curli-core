import {CommandBusSync, QueryBusSync} from "curli-bus";

import {
    DependencyInjection,
    CurliApplication,
    ApplicationEvents,
    ModulesDefiner,
    Module
} from 'curli-types';

export const COMMAND_BUS_SERVICE_NAME = 'commandBus';
export const QUERY_BUS_SERVICE_NAME = 'queryBus';

export class BusModuleDefiner implements ModulesDefiner {

    private container: DependencyInjection | undefined = undefined;
    private commandBus: CommandBusSync | undefined = undefined;
    private queryBus: QueryBusSync | undefined = undefined;

    public constructor(private app: CurliApplication) {
    }

    public getName(): string {
        return 'BusModuleDefiner';
    }

    public beforeCallModules(): void {
        this.container = this.app.getContainer();
        this.registerServices(this.container);

        this.commandBus = this.container.get(COMMAND_BUS_SERVICE_NAME);
        this.queryBus = this.container.get(QUERY_BUS_SERVICE_NAME);
    }

    public whenCallMethodInModules(): ApplicationEvents {
        return 'after:booters';
    }

    public getMethodName(): string {
        return 'registerBusHandler';
    }

    public callMethodInModules(module: Module): void {
        module.registerBusHandler(this.commandBus, this.queryBus, this.container);
    }

    public  afterCallModules(): void {
    }

    private registerServices(container: DependencyInjection) {
        container.registerService(
            COMMAND_BUS_SERVICE_NAME,
            [],
            CommandBusSync
        );
        container.registerService(
            QUERY_BUS_SERVICE_NAME,
            [],
            QueryBusSync
        );
    }

}
