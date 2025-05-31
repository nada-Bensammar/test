class apiError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith(4) ? 'Fail' : 'Error'
        this.isOperational = true
    }
}

module.exports = apiError