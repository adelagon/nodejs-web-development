var models = require('../models');
var express = require('express');
var router = express.Router();

// Enable CORS 
var cors = require('cors');
router.all("*", cors());

// READ

router.get("/", async function(req, res, next) {
    try {
        let Books = await models.Books.findAll();
        res.json(Books);
    } catch (e) {
        next(e);
    }
});

router.get("/:bookId", async function(req, res, next) {
    try {
        let book = await models.Books.findOne({"where": { "bookId": req.params.bookId }});
        if (!book) {
            return res.status(404).send("Not Found");
        }
        res.json(book);
    } catch (e) {
        next(e);
    }
});

// CREATE
router.post("/", async function(req, res, next) {
    try {
        let author = await models.Authors.findOne({"where": { "authorId": req.body.authorId }});
        if (!author) {
            return res.status(404).send("Provided authorId Not Found");
        }
        let publisher = await models.Publishers.findOne({"where": { "publisherId": req.body.publisherId }})
        if (!publisher) {
            return res.status(404).send("Provided publisherId Not Found");
        }
        let book = models.Books.build({
            "title": req.body.title,
            "authorId": req.body.authorId,
            "publisherId": req.body.publisherId,
            "copyright": req.body.copyright
        });
        await book.save();
        res.json(book);
    } catch (e) {
        next(e);
    }
});

// UPDATE
router.put("/:bookId", async function(req, res, next) {
    console.log(req.body);
    try {
        let author = await models.Authors.findOne({"where": { "authorId": req.body.authorId }});
        if (!author) {
            return res.status(404).send("Provided authorId Not Found");
        }
        let publisher = await models.Publishers.findOne({"where": { "publisherId": req.body.publisherId }})
        if (!publisher) {
            return res.status(404).send("Provided publisherId Not Found");
        }
        let book = await models.Books.findOne({"where": { "bookId": req.params.bookId }});
        if (!book) {
            return res.status(404).send("Not Found");
        }
        book.title = req.body.title;
        book.authorId = req.body.authorId;
        book.publisherId = req.body.publisherId;
        book.copyright = req.body.copyright;
        await book.save();
        res.json(book);
    } catch (e) {
        next (e);
    }
});

// DELETE
router.delete("/:bookId", async function(req, res, next) {
    try {
        var book = await models.Books.findOne({"where": { "bookId": req.params.bookId }});
        if (!book) {
            return res.status(404).send("Not Found");
        }
        await book.destroy();
        res.json("success");
    } catch (e) {
        next (e);
    }
});


module.exports = router;
