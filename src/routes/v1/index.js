const express = require('express');

const { InfoController } = require('../../controllers/index')
const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-routes')
const airPortRoutes = require('./airport-routes')

// router.get('/info', (req, res) => {
//     return res.json({ msg: "Hello Kunal You are on track" });
// });
const router = express.Router();
router.use('/airplane', airplaneRoutes);

router.use('/cities', cityRoutes);

router.use('/airports', airPortRoutes);

router.get('/info', InfoController.info)

module.exports = router;