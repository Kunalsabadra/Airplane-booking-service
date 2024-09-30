const { FlightRepository } = require('../repositories');
const { StatusCodes } = require("http-status-codes")
const AppError = require('../utils/errors/app-error')
const { compareTime } = require('../utils/helpers/date-time-helper');
const { Op } = require('sequelize')

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    }
    catch (error) {
        console.log(error);
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    const endingTripTime = "23:59:00";
    let sortFilter = [];
    //trips = MUM-DEL
    if (query.trips) {
        let trips = query.trips;
        [departureAirportId, arrivalAirportId] = trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        if (departureAirportId == arrivalAirportId) return;
    }
    if (query.price) {
        let price = query.price;
        [minPrice, maxPrice] = price.split('-');
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice === undefined) ? 20000 : maxPrice]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats =
        {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    }
    catch (error) {
        if (error.statusCode = StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot get data of requested flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights

}