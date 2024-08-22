const express = require('express');

const { ServerConfig, Logger } = require('./config');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server running on port ${ServerConfig.PORT}`);
    Logger.info("Successfully started the server", "root", {});

    // const { City, Airport } = require('./models')
    // const city = await City.create({
    //     name: 'Mumbai'
    // });
    // console.log(city);
    // const city = await City.findByPk(1);
    // await city.createAirport({ name: 'Delhi Airport Main', code: 'INDI', address: 'Delhi Highway Rajpat' });

    // await City.destroy({
    //     where: {
    //         id: 1
    //     }
    // })
});



