export type CurliApplicationConfig = {
    /**
     * The number of the port we will use for the app
     */
    port: number;

    /**
     * The name of the environment we will use
     */
    environment: string;

    /**
     * A list of environment supported for the app,
     * if it is not sent, the default list is used.
     */
    environmentsSupported?: Array<string>;
}
