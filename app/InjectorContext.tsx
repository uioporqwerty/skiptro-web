import { createContext } from 'react';
import { rootInjector } from './ioc-config';

export const InjectorContext = createContext(rootInjector);
