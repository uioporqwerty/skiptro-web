import { Component } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Ii18nService } from '../../services/i18n/i18n-service';
import './index.scss';

interface Props {
    title?: string;
}

class HeaderComponent extends Component<Props> {
    private i18n: Ii18nService;

    constructor(props: Props, context: any) {
        super(props, context);
        this.i18n = context.resolve('i18n');
    }

    render() {
        return (
            <div className="header-container">
                <h1 className="header-title">
                    {this.props.title ||
                        this.i18n.getTranslation('header_title')}
                </h1>
            </div>
        );
    }
}

HeaderComponent.contextType = InjectorContext;
export const Header = HeaderComponent;
