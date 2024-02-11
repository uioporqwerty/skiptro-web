import { GenericVideoLocatorStrategy } from './strategies/video-locator/generic-video-locator-strategy';
import { rootInjector } from './ioc-config';
import { LoggingService } from './services/logging/logging-service';
import { SkipButton } from './components/skip-button';
import { Config } from './config';
export class ContentScript {
    static inject = ['logger'] as const;
    private audioWS: WebSocket;
    private videoWS: WebSocket;

    constructor(private log: LoggingService) {
        this.audioWS = new WebSocket(`${Config.devWebSocketBaseUrl}/audio`);
        this.audioWS.onopen = () => {
            this.log.debug('Audio WebSocket connection opened.');
        };

        this.audioWS.onclose = () => {
            this.log.debug('Audio WebSocket connection closed.');
        };

        this.videoWS = new WebSocket(`${Config.devWebSocketBaseUrl}/video`);
        this.videoWS.onopen = () => {
            this.log.debug('Video WebSocket connection opened.');
        };

        this.videoWS.onclose = () => {
            this.log.debug('Video WebSocket connection closed.');
        };
    }

    public run() {
        const videoLocatorStrategy = rootInjector.injectClass(
            GenericVideoLocatorStrategy
        );

        window.addEventListener(
            'newVideoDetected',
            (event: CustomEventInit<HTMLVideoElement> | undefined) => {
                const videoElement = event?.detail as HTMLVideoElement;
                if (!videoElement) {
                    this.log.error('Video element not defined.');
                    return;
                }

                // Attach skip button to the video element.
                const skipButton = rootInjector.injectClass(SkipButton);
                skipButton.attachSkipButton(videoElement);
            }
        );

        videoLocatorStrategy.searchForVideoElement();
    }
}

const contentScript = rootInjector.injectClass(ContentScript);
contentScript.run();
