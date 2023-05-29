import { LoggingService } from '../../services/logging/logging-service';
import { VideoLocatorStrategy } from './video-locator-strategy';

export class GenericVideoLocatorStrategy implements VideoLocatorStrategy {
    static inject = ['logger'] as const;
    private videoElement?: HTMLVideoElement;

    constructor(private log: LoggingService) {}

    searchForVideoElement(): void {
        const videoElements = document.getElementsByTagName('video');
        for (let i = 0; i < videoElements.length; i++) {
            const videoElement = videoElements[i];

            if (this.videoIsAutoPlaying(videoElement)) {
                this.videoElement = videoElement;
                this.sendVideoEvent(this.videoElement);
                continue;
            }

            videoElement.onplay = () => {
                if (this.videoElement !== videoElement) {
                    this.videoElement = videoElement;
                    this.sendVideoEvent(this.videoElement);
                }
            };
        }
    }

    private videoIsAutoPlaying(videoElement: HTMLVideoElement) {
        return videoElement.autoplay || !videoElement.paused;
    }

    private sendVideoEvent(videoElement: HTMLVideoElement) {
        window.dispatchEvent(
            new CustomEvent('newVideoDetected', {
                detail: videoElement
            })
        );
    }
}
