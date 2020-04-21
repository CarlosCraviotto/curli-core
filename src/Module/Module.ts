export interface Module {

    /**
     * Return the name of the module
     */
    getName(): string;
    [key: string]: any;
}
