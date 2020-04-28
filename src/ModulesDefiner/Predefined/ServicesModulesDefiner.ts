import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {DependencyInjection, ExternalDependencies} from 'curli-di';
import {DependencyInjection as DependencyInjectionInterface} from 'curli-types';
import {BaseModulesDefiner} from '../BaseModulesDefiner';
import {ModulesDefiner} from 'curli-types';

export class ServicesModulesDefiner extends BaseModulesDefiner implements ModulesDefiner {

    private container: DependencyInjectionInterface | undefined = undefined;

    public getName (): string {
        return 'ServicesModulesDefiner';
    }

    public init (): void {
        this.createContainerService();
        this.app.setContainer((this.container as DependencyInjectionInterface));
    }

    public whenCallMethodInModules (): ApplicationEventsType {
        return 'after:config';
    }

    public getMethodName (): string {
        return 'registerServices';
    }

    public callMethodInModules (module: ModuleBase): void {
        module.registerServices(this.container);
    }

    private createContainerService () {
        const externalDependencies = this.getExternalDependencies();
        this.container = new DependencyInjection(externalDependencies);
    }

    private getExternalDependencies (): ExternalDependencies {
        const externalDependencies: ExternalDependencies = new ExternalDependencies();

        externalDependencies.add('app', this.app);

        if (this.app.initialConfiguration) {
            externalDependencies.bulk(this.app.initialConfiguration);
        }

        externalDependencies.bulk(this.app.getConfig());
        return externalDependencies;
    }

    public afterCalledModules (): void {
    }

}
