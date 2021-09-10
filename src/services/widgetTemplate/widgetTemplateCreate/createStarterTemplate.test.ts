import { log } from '../../../messages';

import createStarterWidgetTemplate, { CreateStarterTemplate } from './createStarterTemplate';

const fs = require('fs');

describe('Create Starter Template', () => {
    const templateName = 'dummyTemplate';

    describe('when directory does not exist', () => {
        afterAll(() => {
            jest.resetAllMocks();
        });

        it('should create a directory', () => {
            jest
                .spyOn(fs, 'existsSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(false);

            jest
                .spyOn(log, 'success')
                .mockImplementation(jest.fn());

            const writeFileSyncStub = jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            const mkdirSyncStub = jest
                .spyOn(fs, 'mkdirSync')
                .mockImplementation(jest.fn());

            createStarterWidgetTemplate.generate(templateName);

            expect(mkdirSyncStub).toHaveBeenCalledTimes(1);
            expect(writeFileSyncStub).toHaveBeenCalledTimes(3);
        });
    });

    describe('when directory exist', () => {
        beforeEach(() => {
            jest
                .spyOn(fs, 'existsSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            jest
                .spyOn(log, 'success')
                .mockImplementation(jest.fn());
        });

        afterAll(() => {
            jest.resetAllMocks();
        });

        it('should not create a directory', () => {
            jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            const mkdirSyncStub = jest
                .spyOn(fs, 'mkdirSync')
                .mockImplementation(jest.fn());

            createStarterWidgetTemplate.generate(templateName);

            expect(mkdirSyncStub).toHaveBeenCalledTimes(0);
        });
    });

    describe('when remove directory is call', () => {
        beforeEach(() => {
            jest
                .spyOn(fs, 'existsSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            jest
                .spyOn(log, 'success')
                .mockImplementation(jest.fn());
        });

        afterAll(() => {
            jest.resetAllMocks();
        });

        it('should delete the directory', () => {
            const rmdirSyncStub = jest
                .spyOn(fs, 'rmdirSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            const blankTemplate = new CreateStarterTemplate(templateName);

            blankTemplate.removeDirectory();

            expect(rmdirSyncStub).toHaveBeenCalledTimes(1);
        });
    });

    describe('when createTemplateFile fails', () => {
        beforeEach(() => {
            jest
                .spyOn(fs, 'existsSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            jest
                .spyOn(log, 'success')
                .mockImplementation(jest.fn());
        });

        afterAll(() => {
            jest.resetAllMocks();
        });

        it('should throw and error', () => {
            jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(() => {
                    throw new Error();
                });

            const blankTemplate = new CreateStarterTemplate(templateName);

            expect(() => {
                blankTemplate.createTemplateFile();
            }).toThrowError();
        });
    });

    describe('when createConfigurationFile fails', () => {
        beforeEach(() => {
            jest
                .spyOn(fs, 'existsSync')
                .mockImplementation(jest.fn())
                .mockReturnValue(true);

            jest
                .spyOn(log, 'success')
                .mockImplementation(jest.fn());
        });

        afterAll(() => {
            jest.resetAllMocks();
        });

        it('should throw and error', () => {
            jest
                .spyOn(fs, 'writeFileSync')
                .mockImplementation(() => {
                    throw new Error();
                });

            const blankTemplate = new CreateStarterTemplate(templateName);

            expect(() => {
                blankTemplate.createConfigurationFile();
            }).toThrowError();
        });
    });
});
