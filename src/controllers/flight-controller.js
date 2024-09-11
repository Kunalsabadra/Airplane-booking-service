const { StatusCodes } = require("http-status-codes")
const { FlightService } = require('../services')
const { ErrorResponse, SuccessReponse } = require('../utils/common')

/**
 * POST : /flight/
 * req-body {flightNumber,airplaneId,departureAirportId,arrivalAirportId ,arrivalTime,departureTime,price,totalSeats,boardingGate}
 */
async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            totalSeats: req.body.totalSeats,
            boardingGate: req.body.boardingGate
        });

        SuccessReponse.data = flight
        return res.status(StatusCodes.CREATED)
            .json(SuccessReponse)
    }
    catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessReponse.data = flights;
        return res.status(StatusCodes.OK)
            .json(SuccessReponse)
    }
    catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createFlight,
    getAllFlights
}