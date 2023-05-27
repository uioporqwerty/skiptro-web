import { LoggingService } from '../logging/logging-service';

interface Ii18nService {
    getTranslation(key: string, substitutions?: string[]): string;
}

class i18nService implements Ii18nService {
    static inject = ['logger'] as const;

    constructor(private log: LoggingService) {}

    getTranslation(key: string, substitutions?: string[]): string {
        return browser.i18n.getMessage(key, substitutions);
    }
}

export { i18nService, Ii18nService };
``