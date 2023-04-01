import { BackgroundScript } from './background-script';
import { ContentScript } from './content-script';
import { rootInjector } from './ioc-config';

const backgroundScript = rootInjector.injectClass(BackgroundScript);
const contentScript = rootInjector.injectClass(ContentScript);

backgroundScript.run();
contentScript.run();
