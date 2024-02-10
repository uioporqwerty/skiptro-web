import { LoggingService } from '../logging/logging-service';
import { IFeatureService } from '../feature/feature-service';
import { Feature } from '../feature/feature';
import { Config } from '../../config';
import { compare } from 'compare-versions';

interface IVersionService {
    getExtensionVersion(): string;
    getMinimumVersion(): Promise<string>;
    requiresUpdate(): Promise<boolean>;
}

class VersionService implements IVersionService {
    static inject = ['logger', 'featureService'] as const;

    constructor(
        private log: LoggingService,
        private features: IFeatureService
    ) {}

    getExtensionVersion(): string {
        return Config.extensionVersion;
    }

    async requiresUpdate(): Promise<boolean> {
        const currentVersion = Config.extensionVersion;
        const minimumVersion = await this.getMinimumVersion();

        const result = compare(currentVersion, minimumVersion, '<');
        this.log.debug(
            `Current version: ${currentVersion}, minimum version: ${minimumVersion}, result: ${result}`
        );

        return result;
    }

    async getMinimumVersion(): Promise<string> {
        return await this.features.getFeatureValue(
            Feature.webExtensionMinimumVersion,
            '1.0.0'
        );
    }
}

export { VersionService, IVersionService };
