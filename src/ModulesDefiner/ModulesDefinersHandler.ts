import {ModulesDefiner, CurliApplication, Module} from 'curli-types';
import {ModulesHandler} from '../Module/ModulesHandler';
import {BASE_EVENTS_NAMES} from '../Events/BaseEventsNamesConst';

export class ModulesDefinersHandler {

    private modulesDefinersCollection: Array<ModulesDefiner>;

    public constructor (private app: CurliApplication, private modules: ModulesHandler) {
        this.modulesDefinersCollection = [];
    }

    /**
     *
     * @param modulesDefiner The definer we want to add
     */
    public add (modulesDefiner: ModulesDefiner) {
        this.checkIfAlreadyExist(modulesDefiner);
        this.modulesDefinersCollection.push(modulesDefiner);
        this.app.emit(BASE_EVENTS_NAMES.MODULES_DEFINER_REGISTER + modulesDefiner.getName());
        this.registerEventFroModulesDefiner(modulesDefiner);
    }

    private checkIfAlreadyExist (modulesDefiner: ModulesDefiner) {
        this.modulesDefinersCollection.forEach((modulesDefinerItem: ModulesDefiner)=>{
            if (modulesDefinerItem.getName() === modulesDefiner.getName()) {
                throw new Error('Modules defined (' + modulesDefiner.getName() + ') already registered.');
            }
        });
    }

    private registerEventFroModulesDefiner (definer: ModulesDefiner) {
        this.app.on(definer.whenCallMethodInModules(), ()=>{
            definer.ini();
            const modulesList: Array<Module> = this.modules.getModulesWithMethod(definer.getMethodName());
            modulesList.forEach((module: Module)=>{
                definer.callMethodInModules(module);
            });

            definer.afterCalledModules();
        });
    }

}
