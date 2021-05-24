const config = require('config');
const airtablebase = config.get('airtableBase'); 

const dotenv = require('dotenv');
dotenv.config();

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API}).base(airtablebase);

module.exports = base;