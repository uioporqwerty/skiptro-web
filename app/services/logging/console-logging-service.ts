import { LoggingService } from './logging-service';

export class ConsoleLoggingService implements LoggingService {
    private tag = '[Skiptro]';

    constructor(private readonly currentDate: Date = new Date()) {}

    debug(message: string): void {
        console.debug(
            `[${this.addTimestamp()}] [DEBUG] ${this.tag} ${message}`
        );
    }

    info(message: string): void {
        console.info(`${this.addTimestamp()}] [INFO] ${this.tag} ${message}`);
    }

    warn(message: string): void {
        console.warn(`${this.addTimestamp()}] [WARN] ${this.tag} ${message}`);
    }

    error(message: string): void {
        console.error(`${this.addTimestamp()}] [ERROR] ${this.tag} ${message}`);
    }

    private addTimestamp(): string {
        return this.currentDate.toISOString();
    }
}
