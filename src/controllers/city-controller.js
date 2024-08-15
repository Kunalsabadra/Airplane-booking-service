const { StatusCodes } = require("http-status-codes")
const { CityService } = require('../services')
const { ErrorResponse, SuccessReponse } = require('../utils/common')

/**
 * POST : /cities/:id
 * req-body {name: 'Delhi'}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessReponse.data = city
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
 * GET : /cities
 * req-body {}
 */
async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();
        SuccessReponse.data = cities;
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
 * GET : /cities/:id
 * req-body {}
 */
async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessReponse.data = city;
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
 * DELETE : /cities/:id
 * req-body {}
 */
async function deleteCity(req, res) {
    try {
        const city = await CityService.deleteCity(req.params.id);
        SuccessReponse.data = city;
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
 * PATCH : /cities/:id
 * req-body {name:'Mumbai'}
 */
async function updateCity(req, res) {
    try {
        let id = req.params.id;
        let data = {
            name: req.body.name
        }
        const city = await AirplaneService.updateAirplane(id, data);
        SuccessReponse.data = city;
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
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity
}