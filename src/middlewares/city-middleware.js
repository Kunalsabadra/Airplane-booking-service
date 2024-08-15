const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessReponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating City',
            ErrorResponse.error = new AppError(["City Name not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}
module.exports = {
    validateCreateRequest
}