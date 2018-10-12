var models = require('../models');
var express = require('express');
var router = express.Router();

// Enable CORS 
var cors = require('cors');
router.all("*", cors());

// READ
router.get("/", async function(req, res, next) {
    try {
        let publishers = await models.Publishers.findAll();
        res.json(publishers);
    } catch (e) {
        next(e);
    }
});


router.get("/:publisherId", async function(req, res, next) {
    try {
        let publishers = await models.Publishers.findOne({"where": { "publisherId": req.params.publisherId }});
        if (!publishers) {
            return res.status(404).send("Not Found");
        }
        res.json(publishers);
    } catch (e) {
        next(e);
    }
});

// ASSIGNMENT: implement the CREATE, UPDATE, DELETE routes in here
module.exports = router;
