import React from 'react';
import ReactDOM from 'react-dom';
import { BackgroundScript } from './background-script';
import { PopUp } from './components/popup';
import { ContentScript } from './content-script';
import { rootInjector } from './ioc-config';
import './index.scss';
import { InjectorContext } from './InjectorContext';
const backgroundScript = rootInjector.injectClass(BackgroundScript);
const contentScript = rootInjector.injectClass(ContentScript);

backgroundScript.run();
contentScript.run();

ReactDOM.render(
    <InjectorContext.Provider value={rootInjector}>
        <PopUp />
    </InjectorContext.Provider>,
    document.getElementById('root')
);
