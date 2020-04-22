export type CurliApplicationConfig = {
    environment: string;
    port: number;
    /**
     * A list of environment supported for the app,
     * if it is not sent, the default list is used.
     */
    environmentsSupported?: Array<string>;
}
