//@flow
import type { SkipButton } from '../../components/skip-button/component';

import type { SkipButtonAttachmentStrategy } from './skip-button-attachment-strategy';

export class GeneralSkipButtonAttachmentStrategy
  implements SkipButtonAttachmentStrategy
{
  getAnchor(): ?Node {
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
    const boundThis = this;
    var isAttached = false;
    const obs = new MutationObserver(function (mutations, observer) {
      if (isAttached) {
        return;
      }
      for (var i = 0; i < mutations.length; i++) {
        const mutationRecord = mutations[i];
        for (var j = 0; j < mutationRecord.target.childNodes.length; j++) {
          const childNode = mutationRecord.target.childNodes[j];
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

  getVideoElement(): ?HTMLVideoElement {
    const videoTags = document.getElementsByTagName('video');
    if (!videoTags) {
      return null;
    }
    return videoTags[0];
  }

  findVideoElementParent(node: Node): ?Node {
    if (node.tagName === 'VIDEO' || node.tagName === 'IFRAME') {
      return node.tagName === 'VIDEO'
        ? node.parentNode.parentNode
        : node.parentNode;
    }
    for (var i = 0; i < node.childNodes.length; i++) {
      const parent = this.findVideoElementParent(node.childNodes[i]);
      if (parent) {
        return parent;
      }
    }
  }
}
