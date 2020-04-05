const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const logger = require('./logger');
const config = require('config');

const port = process.env.PORT || 3000;

const app = express();

// Route dependencies

// DB Connection
mongoose.connect(config.get('MONGO_URI'), 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        logger.info({
            function: 'mongoose_connect',
            message: 'DB connection successful'
        });

        // const crons = require('./cron_jobs');
        // crons.addItemstoDatabase();
    })
    .catch((err) => {
        logger.error({
            function: 'mongoose_connect',
            message: 'DB connection failed: ' + err    
        });
    }
);


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

// Invalid route
app.use((req, res) => {
    logger.error({ 
        message: 'Route ' + req.path + ' not found' 
    });
    res.status(404).jsonp({ 
        errorMessage: 'Route not found: ' + req.path 
    });
});

app.listen(port, () => {
    logger.info({
        function: 'app_start',
        message: 'Backend is listening on port ' + port
    });
});
