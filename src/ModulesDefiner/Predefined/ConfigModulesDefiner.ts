import {ApplicationEventsType} from '../../Events/ApplicationEventsType';
import {ModuleBase} from '../../Module/ModuleBase';
import {BaseModulesDefiner} from '../BaseModulesDefiner';
import {normalize} from 'path';
import {Config} from 'curli-config';
import {ModulesDefiner} from '../ModulesDefiner';

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

    private createConfig () {
        const path: string = normalize(__dirname + '/../../__tests__/files');
        this.config = new Config({
            environment: 'local',
            forceValidateSchemas: false,
            filesPaths: [
                {path: path},
            ],
        });
    }

    // private getExternalDependencies(): ExternalDependencies {
    //     const externalDependencies: ExternalDependencies = new ExternalDependencies();
    //
    //     externalDependencies.add("app", this.app);
    //
    //     if (this.app.initialConfiguration) {
    //         externalDependencies.bulk(this.app.initialConfiguration);
    //     }
    //
    //     externalDependencies.bulk(this.app.getConfig());
    //     return externalDependencies;
    // }

}
