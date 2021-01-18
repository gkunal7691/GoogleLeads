const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const Businesses = require('../../models').Businesses;
const Apikey = require('../../models').Apikay;
var request = require('request');



router.post('/', async (req, res, next) => {
    var allImportsData = req.body;
    var eachImportData = allImportsData.map(x => x.place_id)
    for(var i =0; i<eachImportData.length;i++){
    var option = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+ eachImportData[i] +'&fields=place_id,name,formatted_phone_number,formatted_address,website&key=AIzaSyAhhL0iW8nLYyCPsAHGv2Wj9CIKOx9TiDk',
        json: true
    };
    request(option, function (error, response, body) {
        console.log(option)
        Businesses.create(
            {
                businessName: body.result.name,
                phone: body.result.formatted_phone_number,
                website: body.result.website,
                placeId: body.result.place_id,
                address: body.result.formatted_address
            }
        ).then(data => {
            res.json({ success: true, data: data })
        }).catch(next => console.log(next))
    })
}
})


router.get('/', async function (req, res, next) {
    BusinessSearch.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.post('/search', async (req, res, next) => {
    Apikey.findOne(
        { where: { apikeyId: 1 } },
        { attributes: ['apikey'] }
    ).then((apikey) => {
        var keyword = req.body.keyword;
        var radius = req.body.radius * 1000;
        var option = {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.9729391,77.6294794&radius=' + radius + '&keyword=' + keyword + '&key=' + apikey.apikey,
            json: true
        };
        request(option, function (error, response, body) {
            res.json({ success: true, data: body.results });
        })
    })

})

module.exports = router; 



 // var allImportsData = req.body;
    // var eachImportData = allImportsData.map(x => x.place_id)
    // console.log(eachImportData)
    // var count = 0;
    // for(var x=0;x<eachImportData.length;x++){
    // if(eachImportData.length>=count){
        // var option = {
        //     method: 'GET',
        //     url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJxyAYyJ8WrjsRbvP8BermuDI=place_id,name,formatted_phone_number,formatted_address,website&key=AIzaSyAhhL0iW8nLYyCPsAHGv2Wj9CIKOx9TiDk',
        //     json: true
        // };
        // request(option, function (error, response, body) {
        //     console.log(option.url)
        //     console.log(option)
        //     Businesses.create(
        //         {
        //             businessName: body.result.name,
        //             phone: body.result.formatted_phone_number,
        //             website: body.result.website,
        //             placeId: body.result.place_id,
        //             address: body.result.formatted_address
        //         }
        //     ).then(data => {
        //         res.json({ success: true, data: data })
        //     }).catch(next => console.log(next))
        // })
//     }
//     count++;
// }