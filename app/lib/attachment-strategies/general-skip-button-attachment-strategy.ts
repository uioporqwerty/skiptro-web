import type { SkipButton } from '../../components/skip-button';

import type { SkipButtonAttachmentStrategy } from './skip-button-attachment-strategy';

export class GeneralSkipButtonAttachmentStrategy
    implements SkipButtonAttachmentStrategy
{
    getAnchor(): Node | null {
        const videoTags = document.getElementsByTagName('video');
        if (
            videoTags.length === 0 ||
            !videoTags[0].parentNode ||
            !videoTags[0].parentNode.parentNode
        ) {
            console.log('Could not find anchor to attach skip button.');
            return null;
        }

        return videoTags[0].parentNode.parentNode;
    }

    attachObserved(skipButton: SkipButton): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const boundThis = this;
        let isAttached = false;
        const obs = new MutationObserver(function (mutations) {
            if (isAttached) {
                return;
            }
            for (let i = 0; i < mutations.length; i++) {
                const mutationRecord = mutations[i];
                for (
                    let j = 0;
                    j < mutationRecord.target.childNodes.length;
                    j++
                ) {
                    const childNode = mutationRecord.target.childNodes[
                        j
                    ] as HTMLElement;
                    const videoElementParent =
                        boundThis.findVideoElementParent(childNode);
                    if (videoElementParent) {
                        videoElementParent.appendChild(skipButton.button);
                        isAttached = true;
                        break;
                    }
                }

                if (isAttached) {
                    break;
                }
            }
        });
        obs.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    }

    getVideoElement(): HTMLVideoElement | null {
        const videoTags = document.getElementsByTagName('video');
        if (!videoTags) {
            return null;
        }
        return videoTags[0];
    }

    findVideoElementParent(node: HTMLElement): Node | undefined | null {
        if (node.tagName === 'VIDEO' || node.tagName === 'IFRAME') {
            return node.tagName === 'VIDEO'
                ? node.parentNode?.parentNode
                : node.parentNode;
        }
        for (let i = 0; i < node.childNodes.length; i++) {
            const parent = this.findVideoElementParent(
                node.childNodes[i] as HTMLElement
            );
            if (parent) {
                return parent;
            }
        }
    }
}
