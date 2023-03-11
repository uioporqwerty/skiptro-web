import { createInjector, Scope } from 'typed-inject';
import { ConsoleLoggingService } from './services/logging/console-logging-service';

var rootInjector = createInjector().provideClass(
    'logger',
    ConsoleLoggingService
);
export { rootInjector };
