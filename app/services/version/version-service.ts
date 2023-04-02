import { LoggingService } from '../logging/logging-service';
import { FeatureService } from '../feature/feature-service';
import { Feature } from '../feature/feature';
import { Config } from '../../config';
import { compare } from 'compare-versions';

interface IVersionService {
    getExtensionVersion(): string;
    getMinimumVersion(): string;
    requiresUpdate(): boolean;
}

class VersionService implements IVersionService {
    static inject = ['logger', 'features'] as const;

    constructor(
        private log: LoggingService,
        private features: FeatureService
    ) {}

    getExtensionVersion(): string {
        return Config.extensionVersion;
    }

    public requiresUpdate(): boolean {
        const currentVersion = Config.extensionVersion;
        const minimumVersion = this.getMinimumVersion();

        const result = compare(currentVersion, minimumVersion, '<');
        this.log.debug(
            `Current version: ${currentVersion}, minimum version: ${minimumVersion}, result: ${result}`
        );

        return result;
    }

    public getMinimumVersion(): string {
        return this.features.getFeatureValue(
            Feature.webExtensionMinimumVersion,
            '1.0.0'
        );
    }
}

export { VersionService, IVersionService };
