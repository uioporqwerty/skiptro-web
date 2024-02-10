import { GrowthBook } from '@growthbook/growthbook';
import { LoggingService } from '../logging/logging-service';
import { Config } from '../../config';
import { Feature } from './feature';
import { IFeatureService } from './feature-service';

export class GrowthBookFeatureService implements IFeatureService {
    static inject = ['logger'] as const;
    private growthbook: GrowthBook;
    private featuresInitialized = false;

    constructor(private log: LoggingService) {
        this.growthbook = new GrowthBook({
            apiHost: 'https://cdn.growthbook.io',
            clientKey: Config.environment === 'development' ? Config.
            devGrowthBookClientKey : Config.growthBookClientKey,
            subscribeToChanges: true,
            enableDevMode: Config.environment === 'development',
            onFeatureUsage: (key, result) => {
                this.log.debug(`Feature ${key} has value ${result.value}`);
            }
        });
    }

    async isOn(feature: Feature): Promise<boolean> {
        await this.loadFeatures();
        return Promise.resolve(this.growthbook.isOn(feature))
    }

    async getFeatureValue(feature: Feature, fallbackValue: any): Promise<any> {
        this.loadFeatures();
        return Promise.resolve(this.growthbook.getFeatureValue(feature, fallbackValue));
    }

    private async loadFeatures() {
        if (this.featuresInitialized) {
            return;
        }

        this.featuresInitialized = true;
        await this.growthbook.loadFeatures();
    }
}
