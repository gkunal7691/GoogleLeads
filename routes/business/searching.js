const express = require('express');
const router = express.Router();
var request = require('request');



router.post('/', async (req, res, next) => {
    console.log(req.body)
})
  

module.exports = router;