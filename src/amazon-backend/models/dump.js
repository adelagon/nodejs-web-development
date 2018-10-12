let models = require("./index");

async function main() {
    // Initialize
    await models.sequelize.sync({force: true});
    
    // Create Authors
    let a1 = await models.Authors.build({
        "firstName": "Charles",
        "lastName": "Dickens"
    }).save();
    let a2 = await models.Authors.build({
        "firstName": "F. Scott",
        "lastName": "Fitzgerald"
    }).save();
    let a3 = await models.Authors.build({
        "firstName": "Mark",
        "lastName": "Twain"
    }).save();
    let a4 = await models.Authors.build({
        "firstName": "Jane",
        "lastName": "Austen"
    }).save();
    let a5 = await models.Authors.build({
        "firstName": "H.G.",
        "lastName": "Wells"
    }).save();

    // Create Publishers
    let p1 = await models.Publishers.build({
        "name": "Penguin Publishing",
        "email": "sales@penguin.com",
        "website": "http://penguin.com"
    }).save();
    let p2 = await models.Publishers.build({
        "name": "Simon & Schuster",
        "email": "sales@simonandschuster.com",
        "website": "http://www.simonandschuster.com"
    }).save();

    // Create Books
    await models.Books.build({
        "title": "A Chrismas Carol",
        "copyright": 1844,
        "authorId": a1.authorId,
        "publisherId": p1.publisherId
    }).save();
    await models.Books.build({
        "title": "A Tale of Two Cities",
        "copyright": 1859,
        "authorId": a1.authorId,
        "publisherId": p2.publisherId
    }).save();
    await models.Books.build({
        "title": "The Great Gatsby",
        "copyright": 1925,
        "authorId": a2.authorId,
        "publisherId": p2.publisherId
    }).save();
    await models.Books.build({
        "title": "Sense & Sensibiity",
        "copyright": 1877,
        "authorId": a3.authorId,
        "publisherId": p1.publisherId
    }).save();
    await models.Books.build({
        "title": "War of the Worlds",
        "copyright": 1931,
        "authorId": a4.authorId,
        "publisherId": p2.publisherId
    }).save();
    await models.Books.build({
        "title": "The Time Machine",
        "copyright": 1940,
        "authorId": a1.authorId,
        "publisherId": p2.publisherId
    }).save();

    models.sequelize.close();

}

main();