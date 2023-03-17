import { LoggingService } from '../logging/logging-service';
import { FeatureResult, GrowthBook } from '@growthbook/growthbook';
import { Config } from '../../config';
import { Feature } from './feature';

export class GrowthBookFeatureService {
    static inject = ['logger'] as const;
    private growthbook: GrowthBook;

    constructor(private log: LoggingService) {
        this.growthbook = new GrowthBook({
            apiHost: 'https://cdn.growthbook.io',
            clientKey: Config.growthBookClientKey,
            enableDevMode: Config.environment === 'development',
            onFeatureUsage: (key: string, result: FeatureResult<any>) => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                this.log.debug(`Feature ${key} has value ${result.value}`);
            }
        });

        this.growthbook
            .loadFeatures({
                autoRefresh: true
            })
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .catch((err) => {
                this.log.error(
                    `Error loading features from GrowthBook: ${err}`
                );
            });
    }

    isOn(feature: Feature): boolean {
        return this.growthbook.isOn(feature);
    }

    getFeatureValue(feature: Feature, fallbackValue: any): any {
        return this.growthbook.getFeatureValue(feature, fallbackValue);
    }
}
