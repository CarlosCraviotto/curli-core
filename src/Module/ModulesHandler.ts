import {CurliApplication} from "../CurliApplication";
import {Module} from "./Module";
import {BASE_EVENTS_NAMES} from "../Events/BaseEventsNamesConst";

export class ModulesHandler {
    private modulesCollection: Array<Module>;

    public constructor(private app: CurliApplication) {
        this.modulesCollection = [];
    }

    /**
     *
     * @param module The module we want to add
     */
    public add(module: Module){
        this.checkIfAlreadyExist(module);
        this.app.emit(BASE_EVENTS_NAMES.MODULE_REGISTER + module.getName());
        this.modulesCollection.push(module);
    }

    private checkIfAlreadyExist(module: Module) {
        this.modulesCollection.forEach((moduleItem: Module)=>{
            if (moduleItem.getName() === module.getName()){
                throw new Error('Module ('+module.getName()+') already registered.');
            }
        })
    }

    public getModulesWithMethod(methodName: string): Array<Module> {
        const modulesList = this.modulesCollection.filter((module: Module)=>{
            return (module[methodName] && typeof module[methodName] === 'function')? true : false;
        });
        return modulesList;
    }
}