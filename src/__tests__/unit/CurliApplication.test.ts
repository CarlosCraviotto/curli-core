import chai = require('chai');
import {
    APPLICATION_EVENT_CONST,
    ApplicationEventsType,
    BootersModulesDefiner,
    ConfigModulesDefiner,
    CurliApplication,
    CurliApplicationConfig, EventBusModulesDefiner,
    ServicesModulesDefiner,
} from '../../';
import {getModuleServiceTest} from './ModuleServiceModher';
import {getBooterTest} from './BootersModher';
import { EventBus } from 'curli-bus';
import { DependencyInjection } from 'curli-di';

// function sleep(milliseconds: number) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }

let app: CurliApplication;

const defaultConfiguration: CurliApplicationConfig = {port: 3000, environment: 'local'};

const configurationObject: object = {defaultTime: 3000, anotherConfig: 'test'};

describe('CurliApplication tests', function () {

    beforeEach(()=>{
        app = new CurliApplication(defaultConfiguration);
    });

    it('Should check the configuration methods in the app.', function () {

        app.setConfig(configurationObject);

        chai.assert.deepEqual(defaultConfiguration.environment, app.getEnvironment());
        chai.assert.deepEqual(configurationObject, app.getConfig());
    });

    it('Should register all the events of the app and check we emit all when startApp.', function () {
        const arrayEventToEmit = [
            APPLICATION_EVENT_CONST.AFTER_MODULES_DEFINERS,
            APPLICATION_EVENT_CONST.BEFORE_CONFIG,
            APPLICATION_EVENT_CONST.AFTER_CONFIG,
            APPLICATION_EVENT_CONST.BEFORE_SERVICES,
            APPLICATION_EVENT_CONST.AFTER_SERVICES,
            APPLICATION_EVENT_CONST.BEFORE_BOOTERS,
            APPLICATION_EVENT_CONST.AFTER_BOOTERS,
            APPLICATION_EVENT_CONST.BEFORE_START,
            APPLICATION_EVENT_CONST.AFTER_START,
        ];
        arrayEventToEmit.forEach((event: ApplicationEventsType)=>{
            app.on(event, ()=>{
                arrayEventToEmit.splice(arrayEventToEmit.indexOf(event), 1);
                // sleep(100);
                // console.log("Event -> " + event);
            });
        });

        app.startApp();

        chai.assert.deepEqual(0, arrayEventToEmit.length);
    });

    it('Should register Services Modules Definer.', function () {
        const ModuleServiceTest = getModuleServiceTest();

        ModuleServiceTest.prototype.registerServices = (container: any) => {
            chai.assert.deepEqual(container.get('@testProperty'), 45);
        };

        app.initialConfiguration = {'testProperty': 45};

        const serviceModulesDefiner = new ServicesModulesDefiner(app);
        app.addModulesDefiner(serviceModulesDefiner);
        app.addModule(new ModuleServiceTest());

        app.emit(serviceModulesDefiner.whenCallMethodInModules());
    });

    it('Should register Booter Modules Definer.', function () {
        const ModuleServiceTest = getModuleServiceTest();
        const booterModulesDefiner = new BootersModulesDefiner(app);

        ModuleServiceTest.prototype.registerBooters = (booterDefiner: any) => {

            chai.assert.deepEqual(booterDefiner.getName(), booterModulesDefiner.getName());
        };

        app.addModulesDefiner(booterModulesDefiner);
        app.addModule(new ModuleServiceTest());

        app.emit(booterModulesDefiner.whenCallMethodInModules());
    });

    it('Should register Booter Modules Definer adding booter.', function () {
        const ModuleServiceTest = getModuleServiceTest();
        const booterModulesDefiner = new BootersModulesDefiner(app);

        ModuleServiceTest.prototype.registerBooters = (booterDefiner: BootersModulesDefiner) => {
            const Booter = getBooterTest();
            Booter.prototype.boot = () => {
            };

            booterDefiner.registerBooter(Booter);
            chai.assert.deepEqual(booterDefiner.getName(), booterModulesDefiner.getName());
        };

        app.addModulesDefiner(booterModulesDefiner);
        app.addModule(new ModuleServiceTest());

        app.emit(booterModulesDefiner.whenCallMethodInModules());
    });

    it('Should register Config Modules Definer.', function () {

        const ModuleServiceTest = getModuleServiceTest();
        ModuleServiceTest.prototype.registerConfig = (config: any) => {
            chai.assert.deepEqual(config.get('app-version'), undefined);
        };

        const configModulesDefiner = new ConfigModulesDefiner(app);
        app.addModulesDefiner(configModulesDefiner);
        app.addModule(new ModuleServiceTest());

        app.emit(configModulesDefiner.whenCallMethodInModules());
    });


    it('Should register Event bus Modules Definer And call modules with registerEvens.', function () {

        const ModuleServiceTest = getModuleServiceTest();
        ModuleServiceTest.prototype.registerEvens = (busService: EventBus) => {
            chai.assert.isTrue(busService instanceof  EventBus);
        };

        app.setContainer(new DependencyInjection())

        const eventBusModulesDefiner = new EventBusModulesDefiner(app);
        app.addModulesDefiner(eventBusModulesDefiner);
        app.addModule(new ModuleServiceTest());

        app.emit(eventBusModulesDefiner.whenCallMethodInModules());
    });

    it('Should get right values of Event bus Modules Definer.', function () {

        const eventBusModulesDefiner = new EventBusModulesDefiner(app);
        chai.assert.deepEqual('registerEvens', eventBusModulesDefiner.getMethodName());
        chai.assert.deepEqual('EventBusModulesDefiner', eventBusModulesDefiner.getName());
        chai.assert.deepEqual('after:services', eventBusModulesDefiner.whenCallMethodInModules());
    });

    it('Should throw an error when register two modules with same name.', function () {
        const ModuleServiceTest = getModuleServiceTest();

        app.addModule(new ModuleServiceTest());

        chai.assert.throws(function () {
            app.addModule(new ModuleServiceTest());
        }, 'Module (ModuleServiceTest) already registered.');
    });

    it('Should throw an error when register two definers with same name.', function () {
        const configModulesDefiner = new ConfigModulesDefiner(app);
        app.addModulesDefiner(configModulesDefiner);

        chai.assert.throws(function () {
            app.addModulesDefiner(configModulesDefiner);
        }, 'Modules defined (ConfigModulesDefiner) already registered.');
    });

});
