const http = require("http");
const moment = require("moment");
const app = require('./app');



var port = process.env.VCAP_APP_PORT || 8070;

const server = http.createServer(app);

var datetime = moment().format();

server.listen(port);

console.log("SERVER STARTED @: " + datetime + " on PORT: " + port);

require("cf-deployment-tracker-client").track();