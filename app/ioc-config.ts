import { createInjector } from 'typed-inject';
import { MixpanelService } from './services/analytics/mixpanel-service';
import { ConsoleLoggingService } from './services/logging/console-logging-service';

var rootInjector = createInjector()
    .provideClass('logger', ConsoleLoggingService)
    .provideClass('analytics', MixpanelService);

export { rootInjector };
