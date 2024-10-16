const { CrudRepository } = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const { Sequelize } = require('sequelize')

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [{                            //for joins
                model: Airplane,
                required: true,
                as: "Airplane_Details"
            }, {
                model: Airport,
                required: true,
                as: "Departure_Airport",
                on: {
                    col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), '=',
                        Sequelize.col("Departure_Airport.code")
                    )
                },   //for adding custom column joins apart from id column
                include: {
                    model: City,
                    required: true
                }
            }
            ]
        })
        return response;
    }
}

module.exports = FlightRepository;