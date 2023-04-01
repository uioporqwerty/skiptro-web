import { BrowserMessageType } from './lib/browser-message-type';
import { MinimumVersionChecker } from './lib/minimum-version-checker';
import { NotificationId } from './lib/notification-id';
import { ONE_MINUTE } from './lib/time';
import { LoggingService } from './services/logging/logging-service';

export class BackgroundScript {
    static inject = ['logger', 'minimumVersionChecker'] as const;

    constructor(
        private log: LoggingService,
        private minimumVersionChecker: MinimumVersionChecker
    ) {}

    public run() {
        this.attachListeners();
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setInterval(async () => await this.checkForUpdate(), ONE_MINUTE);
    }

    private attachListeners() {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        browser.runtime.onInstalled.addListener(async () => {
            await browser.storage.local.set({
                notification_updateRequired_prompted: false
            });
        });
    }

    private async checkForUpdate() {
        if (this.minimumVersionChecker.requiresUpdate()) {
            this.log.debug('Update required.');
            const minimumVersion: string =
                this.minimumVersionChecker.getMinimumVersion();

            await browser.runtime.sendMessage({
                type: BrowserMessageType.updateRequired
            });

            const notificationShown = await browser.storage.local.get(
                'notification_updateRequired_prompted'
            );
            if (notificationShown) {
                this.log.debug('Update notification already shown.');
                return;
            }

            const notificationTitle = browser.i18n.getMessage(
                'notification_updateRequired_title'
            );
            const notificationMessage = browser.i18n.getMessage(
                'notification_updateRequired_message',
                [minimumVersion]
            );

            await browser.notifications.create(NotificationId.updateRequired, {
                type: 'basic',
                title: notificationTitle,
                message: notificationMessage
            });
            await browser.storage.local.set({
                notification_updateRequired_prompted: true
            });
        } else {
            this.log.debug('Update not required.');
        }
    }
}
