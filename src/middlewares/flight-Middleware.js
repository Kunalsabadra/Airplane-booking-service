const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/date-time-helper')

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while creating flight',
            ErrorResponse.error = new AppError(["flightNumber not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["airplaneId not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["departureAirportId not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["arrivalAirportId not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["arrivalTime not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["departureTime not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.price) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["price not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["totalSeats not found in req"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (compareTime(req.body.arrivalTime, req.body.departureTime)) {
        ErrorResponse.message = 'Something went wrong while creating Flight',
            ErrorResponse.error = new AppError(["Arrival Time Cannot be after Departure Time"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    next();
}
module.exports = {
    validateCreateRequest
}