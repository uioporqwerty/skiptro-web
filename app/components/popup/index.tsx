import { Component } from 'react';
import { Ii18nService } from '../../services/i18n/i18n-service';
import { InjectorContext } from '../../InjectorContext';
import { Footer } from '../footer';
import { Header } from '../header';
import './index.css';

type PopUpProps = {};
class PopUpComponent extends Component {
    private i18n: Ii18nService;

    constructor(props: PopUpProps, context: any) {
        super(props, context);
        this.i18n = context.resolve('i18n');
    }

    render() {
        return (
            <div className="popup-container">
                <Header className="popup-header" />
                <Header
                    className="popup-tagline"
                    size="h2"
                    title={this.i18n.getTranslation('popup_tagline')}
                />
                <div className="popup-content"></div>
                <Footer />
            </div>
        );
    }
}

PopUpComponent.contextType = InjectorContext;
export const PopUp = PopUpComponent;
