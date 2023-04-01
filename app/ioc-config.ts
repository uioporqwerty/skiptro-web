import { createInjector } from 'typed-inject';
import { MinimumVersionChecker } from './lib/minimum-version-checker';
import { MixpanelService } from './services/analytics/mixpanel-service';
import { GrowthBookFeatureService } from './services/feature/growthbook-feature-service';
import { ConsoleLoggingService } from './services/logging/console-logging-service';

const rootInjector = createInjector()
    .provideClass('logger', ConsoleLoggingService)
    .provideClass('features', GrowthBookFeatureService)
    .provideClass('analytics', MixpanelService)
    .provideClass('minimumVersionChecker', MinimumVersionChecker);

export { rootInjector };
