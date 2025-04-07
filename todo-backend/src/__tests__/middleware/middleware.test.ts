import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../middleware/error.middleware';
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

describe('Error Handling Middleware', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        next = jest.fn();
    });

    it('should respond with a 500 status code and appropriate error message when an error occurs', () => {
        const error = new Error('Test Error');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            error: 'Internal Server Error'
        });

        expect(next).not.toHaveBeenCalled();
    });

    it('should log the error to the console', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = new Error('Test Error');

        errorHandler(error, req, res, next);

        expect(consoleSpy).toHaveBeenCalledWith(error);
    });
});
