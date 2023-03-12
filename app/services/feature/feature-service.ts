import { Feature } from './feature';

export interface FeatureService {
    isOn(feature: Feature): boolean;
    getFeatureValue(feature: Feature, fallbackValue: any): any;
}
