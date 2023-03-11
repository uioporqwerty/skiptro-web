import { AnalyticsService } from 'app/services/analytics/analytics-service';
import { LoggingService } from 'app/services/logging/logging-service';
import { SkipButtonAttachmentStrategy } from '../../lib/attachment_strategies/skip-button-attachment-strategy';

export class SkipButton {
    private video?: HTMLVideoElement | null;
    public button: HTMLButtonElement;
    public static inject = ['logger', 'analytics'] as const;

    constructor(
        private log: LoggingService,
        private analytics: AnalyticsService
    ) {
        this.button = document.createElement('button');
        this.button.className = 'skip-button';
        this.button.innerText = browser.i18n.getMessage('skip');
        this.button.onclick = () => {
            if (!this.video) {
                console.error('Video element not defined.');
                return;
            }
            this.analytics.track('Skip Clicked');
            console.log(`Duration of the video is ${this.video.duration}`);
            console.log('Going to time 4s');
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
