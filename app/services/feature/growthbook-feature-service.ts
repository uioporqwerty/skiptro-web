import { LoggingService } from '../logging/logging-service';
import { FeatureResult, GrowthBook } from '@growthbook/growthbook';
import { Config } from '../../config';

export class GrowthBookFeatureService {
    static inject = ['logger'] as const;
    private growthbook: GrowthBook;

    constructor(private log: LoggingService) {
        this.growthbook = new GrowthBook({
            apiHost: 'https://cdn.growthbook.io',
            clientKey: Config.growthBookClientKey,
            enableDevMode: Config.environment === 'development',
            onFeatureUsage: (key: string, result: FeatureResult<any>) => {
                this.log.debug(`Feature ${key} has value ${result.value}`);
            }
        });

        this.growthbook.loadFeatures({
            autoRefresh: true
        });
    }

    isOn(featureName: string): boolean {
        return this.growthbook.isOn(featureName);
    }
}
