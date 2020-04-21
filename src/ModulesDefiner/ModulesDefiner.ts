import {ApplicationEventsType} from '../Events/ApplicationEventsType';
import {ModuleBase} from '../Module/ModuleBase';

export interface ModulesDefiner {

    /**
     * Return the name of the module defined
     */
    getName(): string;

    /**
     * We call it before we go through all the models
     */
    ini(): void;

    /**
     * This should return the name of the application event when we want to call the modules.
     */
    whenCallMethodInModules(): ApplicationEventsType;

    /**
     * This declare the name of the method into the module we will call,
     * if the module doesn't have it, go for the next one.
     */
    getMethodName(): string;

    /**
     * The accept method in the visitor Pattern, here we know what to call
     * @param _module
     */
    callMethodInModules(module: ModuleBase): void;

    /**
     * We call it after we go through all the models
     */
    afterCalledModules(): void;
}
