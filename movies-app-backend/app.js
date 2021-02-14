const express = require('express');
const winston = require('winston');

const app = express();

require('./startup/logger');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/joi_validation')();

const port = process.env.PORT || 3100;
app.listen(port, () => winston.info(`Server is now running on port ${port}`));