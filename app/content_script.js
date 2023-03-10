// @flow
import { SkipButton } from './components/skip-button/component';
import { GeneralSkipButtonAttachmentStrategy } from './lib/attachment_strategies/general-skip-button-attachment-strategy';
import type { LoggingService } from './services/logging/logging-service';
import { ConsoleLoggingService } from './services/logging/console-log-service';

const Logger: LoggingService = new ConsoleLoggingService();

const skipButton = new SkipButton();
const attachmentStrategy = new GeneralSkipButtonAttachmentStrategy();
skipButton.attach(attachmentStrategy);
