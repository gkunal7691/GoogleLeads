const express = require('express');
const router = express.Router();
const utils = require('../../config/utils');
const BusinessSearch = require('../../models').BusinessSearch;



router.post('/', async (req, res, next) => {
    BusinessSearch.create(
        req.body
    ).then(data => {
        res.json({ success: true, data: data })
    }).catch(next)
})


router.get('/', async function (req, res, next) {
    BusinessSearch.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});

router.post('/search-data', async (req, res, next) => {
    console.log(req.body)
})

module.exports = router; 