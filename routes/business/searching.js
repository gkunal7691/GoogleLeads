const express = require('express');
const router = express.Router();
var request = require('request');



router.post('/', async (req, res, next) => {
    var keyword = req.body.keyword;
    var radius = req.body.radius*1000;
    var option = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.9729391,77.6294794&radius='+radius+'&keyword='+keyword+'&key=AIzaSyAhhL0iW8nLYyCPsAHGv2Wj9CIKOx9TiDk',
        json: true
     };
     request(option, function (error, response, body) {
        res.json({ success: true, data: body.results });
     })
})
  

module.exports = router;