import { AnalyticsService } from '../../services/analytics/analytics-service';
import { LoggingService } from '../../services/logging/logging-service';
import { IFeatureService } from '../../services/feature/feature-service';

export class SkipButton {
    private video?: HTMLVideoElement | null;
    private introEndTime?: number;
    public button: HTMLButtonElement;
    public static inject = ['logger', 'analytics', 'featureService'] as const;

    constructor(
        private log: LoggingService,
        private analytics: AnalyticsService,
        private featureService: IFeatureService
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

            if (!this.introEndTime) {
                this.log.error(
                    'Intro end time is not defined. Did you call setIntroEndTime?'
                );
                return;
            }

            this.video.currentTime = this.introEndTime;
        };

        window.addEventListener('resize', () => {
            this.setPosition();
        });
    }

    setIntroEndTime(time: number) {
        if (!this.video) {
            return;
        }

        this.log.debug(`Setting intro end to ${time}`);
        this.introEndTime = time;
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
