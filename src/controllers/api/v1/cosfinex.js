
var async = require('async'),
    moment = require('moment'),
    api_cosfinex = {};

api_cosfinex.getListOfTickets = function(req, res) {

      var status = req.query.status || 1;
      var startTime = req.query.start_time || "Jan 1, 1970 00:00:00";
      var endTime = new Date().toISOString();
      var user = req.user;


      var queryObject = {
          startTime :  startTime,//
          endTime: endTime
      };
      var ticketModel = require('../../../models/ticket');

      async.waterfall([
          function(callback) {
              ticketModel.getTicketsAcceptedOrRejectedForConfinex(queryObject, function(err, results) {

                  return callback(err, results);
              });
          }
      ], function(err, results) {
          if (err) return res.send('Error: ' + err.message);
          var responseObject = {
            tickets : results,
            timeStamp : endTime
          }
          return res.json(responseObject);
      });
};


module.exports = api_cosfinex;
