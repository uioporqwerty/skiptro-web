export interface AnalyticsService {
    track(
        event: string,
        data?: Record<string, boolean | string | number>
    ): void;
}
