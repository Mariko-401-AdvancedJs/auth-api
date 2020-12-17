'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes.js');

const v1Routes = require('./routes/v1.js');
app.use('/api/v1', v1Routes);

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(logger);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) { throw new Error("Missing Port"); }
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
