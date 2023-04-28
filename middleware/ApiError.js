class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static duplicate(msg) {
        return new ApiError(409, msg);
    }

    static unAuthorized(msg) {
        return new ApiError(403, msg);
    }

    static internal(msg) {
        return new ApiError(500, "Server Error");
    }
}

export default ApiError;