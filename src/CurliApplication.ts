import * as express from "express";
import {Express, RequestHandler} from "express";
import events = require('events');

import {DependencyInjection} from "curli-di";

import {ModulesDefinersHandler} from "./ModulesDefiner/ModulesDefinersHandler";
import {ModulesDefiner} from "./ModulesDefiner/ModulesDefiner";
import {ModulesHandler} from "./Module/ModulesHandler";
import {Module} from "./Module";
import {APPLICATION_EVENT_CONST} from "./Events";
import {CurliApplicationConfig} from "./CurliApplicationConfig";
//import {BooterList} from "./Booters/BooterList";
// type booterItem = {
//     booter: BooterInterface,
//     options?: any
// }


export class CurliApplication extends events.EventEmitter{

    protected port: number;
    protected environment: string;

    protected modulesDefinerHandle: ModulesDefinersHandler;
    protected modulesHandle: ModulesHandler;

    protected expressApp: Express;

    protected container: DependencyInjection | undefined;

    protected configuration: any;
    public initialConfiguration: { [key: string]: any } | undefined;


    public constructor(config: CurliApplicationConfig) {
        super();
        //console.log(express);
        //register the port we will use to listen the app
        this.port = config.port;
        //register the environment we will use
        this.environment = config.environment;

        this.expressApp = express();

        this.modulesHandle = new ModulesHandler(this);
        this.modulesDefinerHandle = new ModulesDefinersHandler(this, this.modulesHandle);
    }

    public addModulesDefiner(modulesDefiner: ModulesDefiner){
        this.modulesDefinerHandle.add(modulesDefiner)
    }

    public addModule(module: Module){
        this.modulesHandle.add(module)
    }


    public startApp() {
        this.emit(APPLICATION_EVENT_CONST.AFTER_MODULES_DEFINERS);

        this.emit(APPLICATION_EVENT_CONST.BEFORE_CONFIG);
        this.emit(APPLICATION_EVENT_CONST.AFTER_CONFIG);

        this.emit(APPLICATION_EVENT_CONST.BEFORE_SERVICES);
        this.emit(APPLICATION_EVENT_CONST.AFTER_SERVICES);

        this.emit(APPLICATION_EVENT_CONST.BEFORE_BOOTERS);
        this.emit(APPLICATION_EVENT_CONST.AFTER_BOOTERS);

        this.emit(APPLICATION_EVENT_CONST.BEFORE_START);
        this.emit(APPLICATION_EVENT_CONST.AFTER_START);
    }

    public emit(eventName: string): boolean{
        //console.log('Event: ' + eventName);
        return super.emit(eventName);
    }

    public setContainer(container: DependencyInjection) {
        this.container = container;
    }

    public getContainer(): DependencyInjection | never {
        if (!this.container) {
            throw new Error('Not container defined.');
        }
        return this.container;
    }

    public getExpressApp(): Express {
        return this.expressApp;
    }

    public getEnvironment(): string {
        return this.environment;
    }

    public setMiddleware(callable: RequestHandler): Express {
        return this.expressApp.use(callable);
    }

    public initServer(callback?: any): void {
        this.expressApp.listen(this.port, () => {
            callback('localhost:'+this.port);
        });
    }

    setConfig(all: { [p: string]: any }) {
        this.configuration = all;
    }

    getConfig(): { [p: string]: any } {
        return this.configuration;
    }

    log(_message: string): void {
        //console.log(message);
    }

}

// module.exports = function (initialConfiguration) {
//
//     var appStartFoldersCheck = new AppStartFoldersCheck(app),
//         appStartServiceContainer = new AppStartServiceContainer(app),
//         appStartUseMiddleware = new AppStartUseMiddleware(app),
//         appStartTemplatesEngine = new AppStartTemplatesEngine(app),
//         appStartRoutes = new AppStartRoutes(app),
//         appStartFinishIt = new AppStartFinishIt(app),
//         appStartServerServiceCommunications = new AppStartServerServiceCommunications(app);
//
//     //check if the folders are alright
//     appStartFoldersCheck.start();
//
//     //start the service container and register all the services
//     appStartServiceContainer.start(initialConfiguration);
//
//     //start some middleware and other stuff we need to run the app
//     appStartUseMiddleware.start();
//
//     //start the template engine
//     appStartTemplatesEngine.start();
//
//     //register all the routes in the server
//     appStartRoutes.start();
//
//     //Start the server, do the last call to the services and run the socket connection with the user if we need it
//     var httpServer = appStartFinishIt.start();
//
//     appStartServerServiceCommunications.start();
//
//     return httpServer;
// };
