const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessReponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating Airplane',
            ErrorResponse.error = { explanation: "Model Number not found in req" }
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}
module.exports = {
    validateCreateRequest
}