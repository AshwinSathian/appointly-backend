const logger = require('../logger');

const User = require('../models/user.model');

exports.updateActiveSlots = (req, res, next) => {
    User
    .updateOne({ email: req.userData.email }, { slots: req.body.slots })
    .then(result => {
        if (result.n > 0) {
            logger.info({
                function: 'update_active_slots',
                message: 'Active slots successfully updated'
            });
            res.status(200).jsonp({ 
                message: 'Active slots successfully updated' 
            });
        } else {
            logger.error({
                function: 'update_active_slots',
                message: 'User unauthorized. Slots update blocked'
            });
            res.status(401).jsonp({ 
                message: 'User unauthorized' 
            });
        }
    })
    .catch(error => {
        logger.error({
            function: 'update_active_slots',
            message: 'User slots update failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};


exports.getActiveSlots = (req, res, next) => {
    User
    .findOne({ email: req.userData.email })
    .then(result => {
        logger.info({
            function: 'update_active_slots',
            message: 'Active slots successfully fetched'
        });
        res.status(200).jsonp({ 
            message: 'Active slots successfully fetched',
            activeSlots: result.slots 
        });
    })
    .catch(error => {
        logger.error({
            function: 'update_active_slots',
            message: 'User slots fetch failed: ' + error
        });
        res.status(500).jsonp({
            message: 'Internal server error. Please try again.'
        });
    });
};
