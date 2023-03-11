import { ConsoleLoggingService } from '../../../../app/services/logging/console-logging-service';

describe('Unit | Services | Logging | ConsoleLoggingService', () => {
    test('it logs message for debug', () => {
        const message = 'testing';
        const logger = new ConsoleLoggingService();
        jest.spyOn(global.console, 'debug').mockImplementation();

        logger.debug(message);

        expect(console.debug).toBeCalledTimes(1);
        expect(console.debug).toBeCalledWith('Skiptro: ' + message);
    });

    test('it logs message for warn', () => {
        const message = 'testing';
        const logger = new ConsoleLoggingService();
        jest.spyOn(global.console, 'warn').mockImplementation();

        logger.warn(message);

        expect(console.warn).toBeCalledTimes(1);
        expect(console.warn).toBeCalledWith('Skiptro: ' + message);
    });

    test('it logs message for info', () => {
        const message = 'testing';
        const logger = new ConsoleLoggingService();
        jest.spyOn(global.console, 'info').mockImplementation();

        logger.info(message);

        expect(console.info).toBeCalledTimes(1);
        expect(console.info).toBeCalledWith('Skiptro: ' + message);
    });
    test('it logs message for error', () => {
        const message = 'testing';
        const logger = new ConsoleLoggingService();
        jest.spyOn(global.console, 'error').mockImplementation();

        logger.error(message);

        expect(console.error).toBeCalledTimes(1);
        expect(console.error).toBeCalledWith('Skiptro: ' + message);
    });
});
