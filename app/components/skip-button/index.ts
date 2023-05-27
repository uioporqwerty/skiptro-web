import { AnalyticsService } from '../../services/analytics/analytics-service';
import { LoggingService } from '../../services/logging/logging-service';
import { SkipButtonAttachmentStrategy } from '../../lib/attachment-strategies/skip-button-attachment-strategy';
import { FeatureService } from '../../services/feature/feature-service';

export class SkipButton {
    private video?: HTMLVideoElement | null;
    public button: HTMLButtonElement;
    public static inject = ['logger', 'analytics', 'features'] as const;

    constructor(
        private log: LoggingService,
        private analytics: AnalyticsService,
        private features: FeatureService
    ) {
        this.button = document.createElement('button');
        this.button.className = 'skip';
        this.button.innerText = browser.i18n.getMessage('skip');
        this.button.onclick = () => {
            if (!this.video) {
                this.log.error('Video element not defined.');
                return;
            }
            this.analytics.track('Skip Clicked');
            this.log.debug(`Duration of the video is ${this.video.duration}`);
            this.log.debug('Going to time 4s');
            this.video.currentTime = 4;
        };
    }

    attach(attachmentStrategy: SkipButtonAttachmentStrategy): void {
        const targetAttachmentElement = attachmentStrategy.getAnchor();
        if (!targetAttachmentElement) {
            attachmentStrategy.attachObserved(this);
            return;
        }

        targetAttachmentElement.appendChild(this.button);
        this.video = attachmentStrategy.getVideoElement();
    }
}
