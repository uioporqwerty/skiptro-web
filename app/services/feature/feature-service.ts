import { Feature } from './feature';

export interface IFeatureService {
    isOn(feature: Feature): Promise<boolean>;
    getFeatureValue(feature: Feature, fallbackValue: any): Promise<any>;
}
