import * as express from 'express';
import {Express, RequestHandler} from 'express';
import events = require('events');

import {DependencyInjection} from 'curli-di';

import {ModulesDefinersHandler} from './ModulesDefiner/ModulesDefinersHandler';
import {ModulesDefiner} from './ModulesDefiner/ModulesDefiner';
import {ModulesHandler} from './Module/ModulesHandler';
import {Module} from './Module';
import {APPLICATION_EVENT_CONST} from './Events';
import {CurliApplicationConfig} from './CurliApplicationConfig';
import {DEFAULT_ENVIRONMENTS} from "./AppConst";

export class CurliApplication extends events.EventEmitter {

    protected port: number;
    protected environment: string;
    protected environmentsSupported: Array<string>;

    protected modulesDefinerHandle: ModulesDefinersHandler;
    protected modulesHandle: ModulesHandler;

    protected expressApp: Express;

    protected container: DependencyInjection | undefined;

    protected configuration: any;
    public initialConfiguration: { [key: string]: any } | undefined;

    public constructor (config: CurliApplicationConfig) {
        super();

        // register the port we will use to listen the app
        this.port = config.port;

        // register the environment we will use
        this.environment = config.environment;

        this.environmentsSupported =
            (config.environmentsSupported)? config.environmentsSupported : DEFAULT_ENVIRONMENTS;

        this.expressApp = express();

        this.modulesHandle = new ModulesHandler(this);
        this.modulesDefinerHandle = new ModulesDefinersHandler(this, this.modulesHandle);
    }

    public addModulesDefiner (modulesDefiner: ModulesDefiner) {
        this.modulesDefinerHandle.add(modulesDefiner);
    }

    public addModule (module: Module) {
        this.modulesHandle.add(module);
    }

    /**
     * Call the start events for the app.
     */
    public startApp (): void {
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

    /**
     * Emit an event in the app
     * @param eventName
     */
    public emit (eventName: string): boolean {
        return super.emit(eventName);
    }

    /**
     * Set the service container (see curli-di).
     * We are doing it from the ServiceModulesDefiner
     *
     * @param container
     */
    public setContainer (container: DependencyInjection) {
        this.container = container;
        this.registerExpressIntoTheContainer();
    }

    /**
     * Get the service container (see curli-di).
     */
    public getContainer (): DependencyInjection | never {
        if (!this.container) {
            throw new Error('Not container defined.');
        }
        return this.container;
    }

    public getExpressApp (): Express {
        return this.expressApp;
    }

    public getEnvironment (): string {
        return this.environment;
    }

    /**
     * Return an array with the supported environments in the app.
     */
    public getEnvironmentsSupported (): Array<string> {
        return this.environmentsSupported;
    }

    /**
     * Set a middleware in the express app.
     * @param callable
     */
    public setMiddleware (callable: RequestHandler): Express {
        return this.expressApp.use(callable);
    }

    public initServer (callback?: any): void {
        this.expressApp.listen(this.port, () => {
            callback('localhost:' + this.port);
        });
    }

    setConfig (all: { [p: string]: any }): void {
        this.configuration = all;
    }

    getConfig (): { [p: string]: any } {
        return this.configuration;
    }

    log (message: string): void {
        console.log(message);
    }

    /**
     * Register the express app as a service and it can be injected since now.
     */
    private registerExpressIntoTheContainer (): void {
        (this.container as DependencyInjection).registerServiceBuilded(
            'expressApp',
            this.getExpressApp()
        );
    }

}
