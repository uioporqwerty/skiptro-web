//@flow
import type { SkipButton } from '../../components/skip-button/component';

export interface SkipButtonAttachmentStrategy {
  getAnchor(): ?Node;
  attachObserved(skipButton: SkipButton): void;
}
