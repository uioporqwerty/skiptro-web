export interface AnalyticsService {
    track(event: string, data?: Record<any, any>): void;
}
