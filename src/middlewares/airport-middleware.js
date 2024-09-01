const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessReponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating Airport',
            ErrorResponse.error = new AppError(["Airport Name not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.code) {
        ErrorResponse.message = 'Something went wrong while creating Airport',
            ErrorResponse.error = new AppError(["Airport Code not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.address) {
        ErrorResponse.message = 'Something went wrong while creating Airport',
            ErrorResponse.error = new AppError(["address not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating Airport',
            ErrorResponse.error = new AppError(["cityId not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    next();
}
module.exports = {
    validateCreateRequest
}