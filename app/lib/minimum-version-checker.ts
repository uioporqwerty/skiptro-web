import { LoggingService } from '../services/logging/logging-service';
import { FeatureService } from '../services/feature/feature-service';
import { Feature } from '../services/feature/feature';
import { Config } from '../config';
import { compare } from 'compare-versions';

export class MinimumVersionChecker {
    static inject = ['logger', 'features'] as const;

    constructor(
        private log: LoggingService,
        private features: FeatureService
    ) {}

    public requiresUpdate() {
        const currentVersion = Config.extensionVersion;
        const minimumVersion = this.features.getFeatureValue(
            Feature.webExtensionMinimumVersion,
            '1.0.0'
        );

        const result = compare(currentVersion, minimumVersion, '<');
        this.log.debug(
            `Current version: ${currentVersion}, minimum version: ${minimumVersion}, result: ${result}`
        );

        return result;
    }

    public getMinimumVersion() {
        return this.features.getFeatureValue(
            Feature.webExtensionMinimumVersion,
            '1.0.0'
        );
    }
}
