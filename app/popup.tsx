import React from 'react';
import ReactDOM from 'react-dom';
import { PopUp } from './components/popup';
import { InjectorContext } from './InjectorContext';
import { rootInjector } from './ioc-config';
import './index.scss';

ReactDOM.render(
    <InjectorContext.Provider value={rootInjector}>
        <PopUp />
    </InjectorContext.Provider>,
    document.getElementById('root')
);
