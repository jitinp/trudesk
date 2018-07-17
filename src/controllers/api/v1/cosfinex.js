
var async = require('async'),
    api_cosfinex = {};

api_cosfinex.getListOfTickets = function(req, res) {

      // var startDate = req.query.startDate;

      // var l = (req.query.limit ? req.query.limit : 10);
      // var limit = parseInt(l);
      // var page = parseInt(req.query.page);
      // var assignedSelf = req.query.assignedself;
      var status = req.query.status || 1;
      var user = req.user;

      // var object = {
      //     user: user,
      //     limit: limit,
      //     page: page,
      //     assignedSelf: assignedSelf,
      //     status: status
      // };

      var queryObject = {
          status: status
      };

      var ticketModel = require('../../../models/ticket');
      var groupModel = require('../../../models/group');

      async.waterfall([
          function(grps, callback) {
              ticketModel.getTicketsWithObject(grps, queryObject, function(err, results) {
                  // if (!permissions.canThis(user.role, 'notes:view')) {
                  //     _.each(results, function(ticket) {
                  //         ticket.notes = [];
                  //     });
                  // }

                  return callback(err, results);
              });
          }
      ], function(err, results) {
          if (err) return res.send('Error: ' + err.message);

          return res.json(results);
      });
};


module.exports = api_cosfinex;
