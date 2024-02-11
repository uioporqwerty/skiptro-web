import { ConsoleLoggingService } from '../../../../app/services/logging/console-logging-service';

describe('Unit | Services | Logging | ConsoleLoggingService', () => {
    test('it logs message for debug', () => {
        const message = 'testing';
        const currentDate = new Date();
        const logger = new ConsoleLoggingService(currentDate);
        jest.spyOn(global.console, 'debug').mockImplementation();

        logger.debug(message);

        expect(console.debug).toHaveBeenCalledTimes(1);
        expect(console.debug).toHaveBeenCalledWith(
            `${currentDate.toISOString()} [DEBUG] [Skiptro] ${message}`
        );
    });

    test('it logs message for warn', () => {
        const message = 'testing';
        const currentDate = new Date();
        const logger = new ConsoleLoggingService(currentDate);
        jest.spyOn(global.console, 'warn').mockImplementation();

        logger.warn(message);

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            `${currentDate.toISOString()} [WARN] [Skiptro] ${message}`
        );
    });

    test('it logs message for info', () => {
        const message = 'testing';
        const currentDate = new Date();
        const logger = new ConsoleLoggingService(currentDate);
        jest.spyOn(global.console, 'info').mockImplementation();

        logger.info(message);

        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith(
            `${currentDate.toISOString()} [INFO] [Skiptro] ${message}`
        );
    });
    test('it logs message for error', () => {
        const message = 'testing';
        const currentDate = new Date();
        const logger = new ConsoleLoggingService(currentDate);
        jest.spyOn(global.console, 'error').mockImplementation();

        logger.error(message);

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
            `${currentDate.toISOString()} [ERROR] [Skiptro] ${message}`
        );
    });
});
