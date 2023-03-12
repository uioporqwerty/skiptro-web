import { LoggingService } from '../../services/logging/logging-service';
import { VideoLocatorStrategy } from './video-locator-strategy';

export class GenericVideoLocatorStrategy implements VideoLocatorStrategy {
    static inject = ['logger'] as const;
    private videoElement?: HTMLVideoElement;

    constructor(private log: LoggingService) {}

    searchForVideoElement(): void {
        var videoElements = document.getElementsByTagName('video');
        for (var i = 0; i < videoElements.length; i++) {
            var videoElement = videoElements[i];

            videoElement.onplay = () => {
                if (
                    !videoElement.paused &&
                    this.videoElement !== videoElement
                ) {
                    this.videoElement = videoElement;
                    window.dispatchEvent(
                        new CustomEvent('newVideoDetected', {
                            detail: videoElement
                        })
                    );
                }
            };
        }
    }
}
