import { Exception } from './Exception.js';

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super(message, 401, 'UNAUTHORIZED');
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}