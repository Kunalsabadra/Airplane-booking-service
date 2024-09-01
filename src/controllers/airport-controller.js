const { StatusCodes } = require("http-status-codes")
const { AirportService } = require('../services')
const { ErrorResponse, SuccessReponse } = require('../utils/common')

/**
 * POST : /airports/:id
 * req-body {name , code ,address , cityId }
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessReponse.data = airport
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
 * GET : /airports
 * req-body {}
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessReponse.data = airports;
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
 * GET : /airports/:id
 * req-body {}
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessReponse.data = airport;
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
 * DELETE : /airports/:id
 * req-body {}
 */
async function deleteAirport(req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id);
        SuccessReponse.data = airport;
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
 * PATCH : /airports/:id
 * req-body {name , code , address , cityId}
 */
async function updateAirport(req, res) {
    try {
        let id = req.params.id;
        let data = {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        }
        const airport = await AirportService.updateAirport(id, data);
        SuccessReponse.data = airport;
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
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}