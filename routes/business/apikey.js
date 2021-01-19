const express = require('express');
const router = express.Router();
const Apikay = require('../../models').Apikay;



router.put('/', async (req, res, next) => {
    Apikay.update(
        req.body,
        {where:{apikeyId : 1}}
    ).then(data => {
        res.json({ success: true, data: data })
    }).catch(next)
})


router.get('/', async function (req, res, next) {
    Apikay.findAll().then((data) => {
        res.json({ success: true, data: data });
    }).catch(next)
});


module.exports = router; 