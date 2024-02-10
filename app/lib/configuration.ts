export interface Configuration {
    mixpanelToken: string;
    growthBookClientKey: string;
    devGrowthBookClientKey: string;
    environment: 'development' | 'production';
    extensionVersion: string;
}
