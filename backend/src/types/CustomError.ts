class CustomError extends Error {

    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.stack = "";
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default CustomError;