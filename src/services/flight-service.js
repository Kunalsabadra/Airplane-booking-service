const { FlightRepository } = require('../repositories');
const { StatusCodes } = require("http-status-codes")
const AppError = require('../utils/errors/app-error')
const { compareTime } = require('../utils/helpers/date-time-helper')

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



module.exports = {
    createFlight,

}