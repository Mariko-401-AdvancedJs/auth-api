'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./routes/routes');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// App Level MW
app.use(cors());
app.use(morgan('dev'));


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
