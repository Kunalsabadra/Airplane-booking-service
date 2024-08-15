const { StatusCodes } = require("http-status-codes")
const { AirplaneService } = require('../services')
const { ErrorResponse, SuccessReponse } = require('../utils/common')

/**
 * POST : /airplanes/:id
 * req-body {modelNumber: 'airbus320' , capacity:200}
 */
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
/**
 * GET : /airplanes
 * req-body {}
 */
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessReponse.data = airplanes;
        return res.status(StatusCodes.OK)
            .json(SuccessReponse)
    }
    catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode)
            .json(ErrorResponse)
    }
}

/**
 * GET : /airplanes/:id
 * req-body {}
 */
async function getAirplane(req, res) {
    try {
        //  let id = req.param.id;
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessReponse.data = airplane;
        return res.status(StatusCodes.OK)
            .json(SuccessReponse)
    }
    catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode)
            .json(ErrorResponse)
    }
}

/**
 * DELETE : /airplanes/:id
 * req-body {}
 */
async function deleteAirplane(req, res) {
    try {
        const airplane = await AirplaneService.deleteAirplane(req.params.id);
        SuccessReponse.data = airplane;
        return res.status(StatusCodes.OK)
            .json(SuccessReponse)
    }
    catch (err) {
        ErrorResponse.error = err;
        return res.status(err.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}