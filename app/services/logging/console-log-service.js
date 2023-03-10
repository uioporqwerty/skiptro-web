//@flow
import type { LoggingService } from './logging-service';

export class ConsoleLoggingService implements LoggingService {
    #tag = 'Skiptro: ';

    debug(message: string): void {
        console.debug(this.#tag + message);
    }

    info(message: string): void {
        console.info(this.#tag + message);
    }

    warn(message: string): void {
        console.warn(this.#tag + message);
    }

    error(message: string): void {
        console.error(this.#tag + message);
    }
}
