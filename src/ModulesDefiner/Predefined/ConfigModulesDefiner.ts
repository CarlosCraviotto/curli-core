import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {BaseModulesDefiner} from '../BaseModulesDefiner';
import {Config} from 'curli-config';
import {ModulesDefiner} from 'curli-types';

export class ConfigModulesDefiner extends BaseModulesDefiner implements ModulesDefiner {

    private config: Config | undefined = undefined;

    public getName (): string {
        return 'ConfigModulesDefiner';
    }

    public ini (): void {
        this.createConfig();
    }

    public whenCallMethodInModules (): ApplicationEventsType {
        return 'before:config';
    }

    public getMethodName (): string {
        return 'registerConfig';
    }

    public callMethodInModules (module: ModuleBase): void {
        module.registerConfig(this.config);
    }

    public afterCalledModules (): void {
        this.app.setConfig((this.config as Config).getAll());
    }

    /**
     * Create the config file handler and set the environment to load file from here
     */
    private createConfig () {
        this.config = new Config({
            environment: this.app.getEnvironment(),
            environments: this.app.getEnvironmentsSupported(),
            filesPaths: [],
        });
    }

}
