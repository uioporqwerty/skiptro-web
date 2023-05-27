import { LoggingService } from './logging-service';

export class ConsoleLoggingService implements LoggingService {
    private tag = '[Skiptro]';

    constructor(private readonly currentDate: Date = new Date()) {}

    debug(message: string): void {
        console.debug(`${this.tag} ${message} ${this.addTimestamp()}`);
    }

    info(message: string): void {
        console.info(`${this.tag} ${message} ${this.addTimestamp()}`);
    }

    warn(message: string): void {
        console.warn(`${this.tag} ${message} ${this.addTimestamp()}`);
    }

    error(message: string): void {
        console.error(`${this.tag} ${message} ${this.addTimestamp()}`);
    }

    private addTimestamp(): string {
        return this.currentDate.toISOString();
    }
}
