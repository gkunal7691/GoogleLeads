'use strict';

const Sequelize = require('sequelize');
let config = require(__dirname + '/../config/db-config');
const Op = Sequelize.Op


let db = {};
let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* MODELS */

/* CORE */
db.User = require('./core/user')(sequelize, Sequelize);
db.Businesses = require('./business/businesses')(sequelize, Sequelize);
db.Apikay = require('./business/apikey')(sequelize, Sequelize);

/* MAPPING */

module.exports = db;
