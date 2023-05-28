import { createInjector } from 'typed-inject';
import { VersionService } from './services/version/version-service';
import { MixpanelService } from './services/analytics/mixpanel-service';
import { GrowthBookFeatureService } from './services/feature/growthbook-feature-service';
import { ConsoleLoggingService } from './services/logging/console-logging-service';
import { i18nService } from './services/i18n/i18n-service';
import { SkipButton } from './components/skip-button';

const rootInjector = createInjector()
    .provideClass('logger', ConsoleLoggingService)
    .provideClass('features', GrowthBookFeatureService)
    .provideClass('analytics', MixpanelService)
    .provideClass('i18n', i18nService)
    .provideClass('versionService', VersionService)
    .provideClass('skipButton', SkipButton);

export { rootInjector };
