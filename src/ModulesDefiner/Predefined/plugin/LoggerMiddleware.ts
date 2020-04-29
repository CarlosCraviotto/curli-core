import {Middleware} from "curli-bus";
import {CommandInstanceType} from "curli-types";

 /**
 * Log all the commands to the console
 */
 export class LoggerMiddleware extends Middleware {

    execute<T>(command: CommandInstanceType, next: (results?: any) => T): any {
        console.log(command);
        return next(command);
    }

}