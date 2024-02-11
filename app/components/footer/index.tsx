import React from 'react';
import { Component } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Ii18nService } from '../../services/i18n/i18n-service';
import { IVersionService } from '../../services/version/version-service';
import { IFeatureService } from '../../services/feature/feature-service';
import { Feature } from '../../services/feature/feature';
import { Label } from '../label';
import { Link } from '../link';
import './index.css';
import { LoggingService } from '../../services/logging/logging-service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterProps {}
interface FooterState {
    isWebExtensionLicensesLinkEnabled: boolean;
}

class FooterComponent extends Component<FooterProps, FooterState> {
    private versionService: IVersionService;
    private features: IFeatureService;
    private i18n: Ii18nService;
    private log: LoggingService;

    state = {
        isWebExtensionLicensesLinkEnabled: false
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.versionService = context.resolve('versionService');
        this.features = context.resolve('featureService');
        this.i18n = context.resolve('i18n');
        this.log = context.resolve('logger');
    }

    async componentDidMount() {
        const isWebExtensionLicensesLinkEnabled = await this.features.isOn(
            Feature.webExtensionLicensesLink
        );

        this.setState({ isWebExtensionLicensesLinkEnabled });
    }

    render() {
        const currentVersion = this.versionService.getExtensionVersion();
        const currentVersionLabel = this.i18n.getTranslation(
            'popup_currentVersionLabel',
            [currentVersion]
        );

        const licenseLink =
            'https://raw.githubusercontent.com/uioporqwerty/skiptro-web/main/licenses.html';

        return (
            <div className="footer">
                <Label className="footer-version" value={currentVersionLabel} />

                {this.state.isWebExtensionLicensesLinkEnabled && (
                    <Link
                        className="footer-licenses-link"
                        href={licenseLink}
                        text={this.i18n.getTranslation(
                            'popup_licensesLinkText'
                        )}
                        openInNewTab={true}
                    />
                )}
            </div>
        );
    }
}

FooterComponent.contextType = InjectorContext;
export const Footer = FooterComponent;
