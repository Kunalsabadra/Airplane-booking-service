const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require("http-status-codes")
const AppError = require('../utils/errors/app-error')

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }
    catch (error) {
        if (error.name == "TypeError") {
            throw new AppError('Cannot createb a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // console.log("I am getting error")
        // console.log(error);
        throw error;
    }
}

module.exports = {
    createAirplane
}