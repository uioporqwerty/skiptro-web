import { AnalyticsService } from '../../services/analytics/analytics-service';
import { LoggingService } from '../../services/logging/logging-service';
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
        this.button.className = 'skip-button';
        this.button.innerText = browser.i18n.getMessage('skip_button_text');

        const skipIcon = document.createElement('img');
        skipIcon.className = 'skip-button-icon';
        skipIcon.src = browser.runtime.getURL('images/skip-forward.svg');
        skipIcon.alt = browser.i18n.getMessage('skip_button_altText');
        this.button.appendChild(skipIcon);

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

        window.addEventListener('resize', () => {
            this.setPosition();
        });
    }

    attachSkipButton(videoElement: HTMLVideoElement) {
        this.video = videoElement;
        document.body.appendChild(this.button);
        this.setPosition();
    }

    private setPosition() {
        if (!this.video) {
            return;
        }

        const videoRect = this.video.getBoundingClientRect();
        const skipButtonWidth = this.button.offsetWidth;
        const skipButtonHeight = this.button.offsetHeight;
        this.button.style.top = `${
            videoRect.top +
            videoRect.height -
            skipButtonHeight -
            videoRect.height * 0.3
        }px`;
        this.button.style.left = `${
            videoRect.left + videoRect.width - skipButtonWidth
        }px`;
    }
}
