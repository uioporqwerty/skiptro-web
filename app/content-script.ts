import { SkipButton } from './components/skip-button/component';
import { GeneralSkipButtonAttachmentStrategy } from './lib/attachment-strategies/general-skip-button-attachment-strategy';
import { rootInjector } from './ioc-config';

const skipButton = rootInjector.injectClass(SkipButton);

const attachmentStrategy = new GeneralSkipButtonAttachmentStrategy();
skipButton.attach(attachmentStrategy);
