import type { SkipButton } from '../../components/skip-button/component';

export interface SkipButtonAttachmentStrategy {
    /**
     * Returns the anchor element to which the skip button will be attached.
     */
    getAnchor(): Node | null;

    /**
     * Attaches the skip button to an observed element as the document changes.
     * @param {element} skipButton
     */
    attachObserved(skipButton: SkipButton): void;

    /**
     * Returns the video element to which the skip button will use to interact with the video.
     */
    getVideoElement(): HTMLVideoElement | null;
}
