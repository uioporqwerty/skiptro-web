export interface Configuration {
    mixpanelToken: string;
    growthBookClientKey: string;
    environment: 'development' | 'production';
    extensionVersion: string;
}
