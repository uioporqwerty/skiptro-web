import React from 'react';
import { Component } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Ii18nService } from '../../services/i18n/i18n-service';
import { IVersionService } from '../../services/version/version-service';
import { Label } from '../label';
import { Link } from '../link';
import './index.scss';

class FooterComponent extends Component {
    private versionService: IVersionService;
    private i18n: Ii18nService;

    constructor(props: any, context: any) {
        super(props, context);
        this.versionService = context.resolve('versionService');
        this.i18n = context.resolve('i18n');
    }

    render() {
        const currentVersion = this.versionService.getExtensionVersion();
        const currentVersionLabel = this.i18n.getTranslation(
            'popup_currentVersionLabel',
            [currentVersion]
        );

        const licenseLink =
            'https://github.com/uioporqwerty/skiptro-web/licenses.md';

        return (
            <div className="footer">
                <Label className="footer-version" value={currentVersionLabel} />
                <Link
                    className="footer-licenses-link"
                    href={licenseLink}
                    text={this.i18n.getTranslation('popup_licensesLinkText')}
                    openInNewTab={true}
                />
            </div>
        );
    }
}

FooterComponent.contextType = InjectorContext;
export const Footer = FooterComponent;
