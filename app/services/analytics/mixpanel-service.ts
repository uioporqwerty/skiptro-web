import mixpanel from 'mixpanel-browser';
import { Config } from '../../config';
import { AnalyticsService } from './analytics-service';

export class MixpanelService implements AnalyticsService {
    constructor() {
        mixpanel.init(Config.mixpanelToken, {
            debug: Config.environment === 'development'
        });
    }

    track(event: string, data?: Record<any, any>): void {
        mixpanel.track(event, data);
    }
}
