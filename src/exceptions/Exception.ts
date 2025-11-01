export class Exception extends Error {
    public status: number;
    public code: string;
    public errors: Array<{ message: string }>;
    public isCustomHookError: boolean;

    constructor(message: string, status: number = 500, code: string = 'UNKNOWN') {
        super(message);
        this.name = 'Exception';
        this.status = status;
        this.code = code;
        this.errors = [{ message }];
        this.isCustomHookError = true; // Tag as custom hook error
        Object.setPrototypeOf(this, Exception.prototype);
    }
}