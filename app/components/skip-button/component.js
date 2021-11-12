//@flow
import type { SkipButtonAttachmentStrategy } from '../../lib/attachment_strategies/skip-button-attachment-strategy';

export class SkipButton {
  button: HTMLButtonElement;

  constructor() {
    this.button = document.createElement('button');
    this.button.className = 'skip-button';
    this.button.innerText = browser.i18n.getMessage('skip');
    this.button.onclick = () => {
      console.log('clicked skip button');
    };
  }

  attach(attachmentStrategy: SkipButtonAttachmentStrategy): void {
    const targetAttachmentElement = attachmentStrategy.getAnchor();
    if (!targetAttachmentElement) {
      attachmentStrategy.attachObserved(this);
      return;
    }

    targetAttachmentElement.appendChild(this.button);
  }
}
