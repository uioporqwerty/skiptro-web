import React, { Component } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Ii18nService } from '../../services/i18n/i18n-service';
import { LoggingService } from '../../services/logging/logging-service';
import { IVersionService } from '../../services/version/version-service';

class PopUpComponent extends Component {
    private logger: LoggingService;
    private versionService: IVersionService;
    private i18n: Ii18nService;

    constructor(props: any, context: any) {
        super(props, context);
        this.logger = context.resolve('logger');
        this.versionService = context.resolve('versionService');
        this.i18n = context.resolve('i18n');
    }

    render() {
        const currentVersion = this.versionService.getExtensionVersion();
        const currentVersionLabel = this.i18n.getTranslation(
            'popup_currentVersionLabel',
            [currentVersion]
        );

        return (
            <div>
                <span>{currentVersionLabel}</span>
            </div>
        );
    }
}

PopUpComponent.contextType = InjectorContext;
export const PopUp = PopUpComponent;
