import { GenericVideoLocatorStrategy } from './strategies/video-locator/generic-video-locator-strategy';
import { rootInjector } from './ioc-config';
import { LoggingService } from './services/logging/logging-service';

export class ContentScript {
    static inject = ['logger'] as const;

    constructor(private log: LoggingService) {}

    public run() {
        // Find video element. If there are multiple video elements on the screen, find the first video element that is playing; likely that will be the primary video. 
        // Start trying to find a video element using a general strategy. If that fails and the video element is not found, then use a site specific strategy to locate the video. 
        // Use observer API to find videos that may be injected into the DOM after the fact.
        const videoLocatorStrategy = rootInjector.injectClass(
            GenericVideoLocatorStrategy
        );

        window.addEventListener(
            'newVideoDetected',
            (event: CustomEventInit<HTMLVideoElement> | undefined) => {
                const videoElement = event?.detail as HTMLVideoElement;
            }
        );

        videoLocatorStrategy.searchForVideoElement();

        // Start processing frames from the video and send them to an API at specific TBD intervals. The API will send back a 200 response with the start and end times on when the skip button should be shown. If there is no such response data, then the skip button will not be shown. The frame processing will only occur for the first 5 minutes of the video. If an intro response was previously given, then we won't process the frames and instead just use the locally stored value.

        // Once the skip button is attached to the video, if the user presses the skip button, then it is dismissed from the UI and the user is skipped to the end point. If the user goes back to before the intro or any time in between, then the skip intro button will show. If the user does nothing, then the skip intro button will automatically dismiss if the current location in the video >= end time of intro.
    }
}

const contentScript = rootInjector.injectClass(ContentScript);
contentScript.run();
