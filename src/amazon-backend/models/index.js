let Sequelize = require('sequelize');
let config = require('../config.json');

// Initialize the database connection
var sequelize = new Sequelize(config.db);

// Import the models that we have previously created into sequelize
let Authors = sequelize.import('./authors');
let Books = sequelize.import('./books');
let Publishers = sequelize.import('./publishers');

var db = {
    "Authors": Authors,
    "Books": Books,
    "Publishers": Publishers,
    "sequelize": sequelize
};

module.exports = db;
