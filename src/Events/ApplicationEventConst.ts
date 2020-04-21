import {ApplicationEventsType} from "./ApplicationEventsType";

export const APPLICATION_EVENT_CONST: {[key: string]: ApplicationEventsType} = {
    AFTER_MODULES_DEFINERS: 'after:ModulesDefiners',
    BEFORE_CONFIG: 'before:config',
    AFTER_CONFIG: 'after:config',
    BEFORE_SERVICES: 'before:services',
    AFTER_SERVICES: 'after:services',
    BEFORE_BOOTERS: 'before:booters',
    AFTER_BOOTERS: 'after:booters',
    BEFORE_START: 'before:start',
    AFTER_START: 'after:start',
}