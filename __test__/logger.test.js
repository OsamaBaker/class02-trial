'use strict';

const loggerMiddleware = require('../src/middleware/logger');

describe('logger middleware', () => {

    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn();
    
    beforeEach(() => {
        // attach to the console method
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        // restore console method to it's original state
        consoleSpy.mockRestore();
    });

    it('should test the console log', async () => {
        loggerMiddleware(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should move to next middleware', async () => {
        loggerMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
})
