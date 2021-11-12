// @flow
import { SkipButton } from './components/skip-button/component';
import { GeneralSkipButtonAttachmentStrategy } from './lib/attachment_strategies/general-skip-button-attachment-strategy';

const skipButton = new SkipButton();
const attachmentStrategy = new GeneralSkipButtonAttachmentStrategy();
skipButton.attach(attachmentStrategy);
