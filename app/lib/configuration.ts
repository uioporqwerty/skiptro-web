export interface Configuration {
    mixpanelToken: string;
    growthBookClientKey: string;
    devGrowthBookClientKey: string;
    devWebSocketBaseUrl: string;
    environment: 'development' | 'production';
    extensionVersion: string;
}
