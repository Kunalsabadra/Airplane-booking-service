const { StatusCodes } = require("http-status-codes")
const { AirplaneService } = require('../services')
const { ErrorResponse, SuccessReponse } = require('../utils/common')


async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessReponse.data = airplane
        return res.status(StatusCodes.CREATED)
            .json(SuccessReponse)
    }
    catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane
}