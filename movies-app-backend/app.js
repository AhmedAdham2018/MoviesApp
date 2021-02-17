const express = require('express');
const winston = require('winston');
const config = require('config');
const app = express();

require('./startup/logger');
require('./startup/routes')(app);
require("./startup/cors")(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/joi_validation')();

const port = process.env.PORT || config.get('port');
app.listen(port, () => winston.info(`Server is now running on port ${port}`));