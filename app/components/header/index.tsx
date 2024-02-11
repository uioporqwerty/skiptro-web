import { Component, HTMLAttributes } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Ii18nService } from '../../services/i18n/i18n-service';
import './index.css';

type HeaderProps = {
    title?: string;
    size?: 'h1' | 'h2' | 'h3' | 'h4';
} & HTMLAttributes<HTMLDivElement>;

class HeaderComponent extends Component<HeaderProps> {
    private i18n: Ii18nService;

    constructor(props: HeaderProps, context: any) {
        super(props, context);
        this.i18n = context.resolve('i18n');
    }

    render() {
        const Heading = this.props.size ?? 'h1';

        return (
            <div className={`${this.props.className} header-container`}>
                <Heading className="header-title">
                    {this.props.title ||
                        this.i18n.getTranslation('header_title')}
                </Heading>
            </div>
        );
    }
}

HeaderComponent.contextType = InjectorContext;
export const Header = HeaderComponent;
