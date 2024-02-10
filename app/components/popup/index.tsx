import React from 'react';
import { Component } from 'react';
import { InjectorContext } from '../../InjectorContext';
import { Footer } from '../footer';
import { Header } from '../header';
import './index.css';

class PopUpComponent extends Component {
    render() {
        return (
            <div className="popup-container">
                <Header />
                <div className="popup-content"></div>
                <Footer />
            </div>
        );
    }
}

PopUpComponent.contextType = InjectorContext;
export const PopUp = PopUpComponent;
