var models = require('../models');
var express = require('express');
var router = express.Router();

// Enable CORS 
var cors = require('cors');
router.all("*", cors());

// READ
router.get("/", async function(req, res, next) {
    try {
        let authors = await models.Authors.findAll();
        res.json(authors);
    } catch (e) {
        next(e);
    }
});

router.get("/:authorId", async function(req, res, next) {
    try {
        let author = await models.Authors.findOne({"where": { "authorId": req.params.authorId }});
        if (!author) {
            return res.status(404).send("Not Found");
        }
        res.json(author);
    } catch (e) {
        next(e);
    }
});

// ASSIGNMENT: implement the CREATE, UPDATE, DELETE routes in here
module.exports = router;
