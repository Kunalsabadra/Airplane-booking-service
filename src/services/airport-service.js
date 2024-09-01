const { AirportRepository } = require('../repositories');
const { StatusCodes, BAD_REQUEST } = require("http-status-codes")
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    }
    catch (error) {
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot createb a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    }
    catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data all Airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    }
    catch (error) {
        if (error.statusCode = StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot get data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirport(id) {
    try {
        const airport = await airportRepository.destory(id);
        return airport;
    }
    catch (error) {
        if (error.statusCode = StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete doesnt exist', error.statusCode);
        }
        throw new AppError('Cannot get data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    }
    catch (error) {
        console.log(error);
        if (error.statusCode = StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update doesnt exist', error.statusCode);
        }
        throw new AppError('Cannot get data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}