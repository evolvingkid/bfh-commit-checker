// * file for starup programs
const app = require("./api");
var schedule = require('node-schedule');
//const connectDB = require('./config/db');
const { sheetGithubMark } = require('./sheet');

// * other startup Programs
sheetGithubMark();


// * scheduler
var j = schedule.scheduleJob('10 */1 * * *', function() { 
    sheetGithubMark();
});



// * connecting DB 
//connectDB();


// * connetcting PORT
const PORT = process.env.PORT || 4000;
let server = app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));

// ! required for unit testing API
module.exports = server;