var sequelize = require('../../config/sequelizeConfig');
var _ = require('lodash');
var db = require('../models').story;
var user = require('../models').User;
var storyStatusDB = require('../models').storyStatus;
var storyTypeDB = require('../models').storyType;

exports.createStory = function(req, res) {
  var storyDetails = {
    story_summery: req.body.storySummery,
    story_type: req.body.storyType,
    story_priority: req.body.storyPriority,
    story_point: req.body.storyPoint,
    story_description: req.body.storyDescription,
    story_status: req.body.storyStatus,
    story_is_blocked: req.body.storyIsBlocked,
    project_id: req.body.projectId,
    userId: req.body.storyAssignee
  };

  return sequelize.sync({ force: false }).then(function () {
      db.create(storyDetails).then(function (data) {
        return data;
      }, function (error) {
        return false;
      });
    });
}

exports.getStoryByUser = function(projectId, userId) {
  var storyData = [];
  return db.findAll({
      where: {
        project_id: projectId,
        userId: userId
      },
      include: [{
        model: user,
        attributes: ['email', 'firstName', 'lastName']
      }]
    })
    .then(function(storyList) {
      var listLength = storyList.length;
      _(storyList).forEach(function(value, key) {
        storyData.push(storyList[key].dataValues);
      })
      return storyData;

    })
}

exports.updateStoryStatusInfo = function(req, res) {
  db.update({
    story_status: req.body.story_status
  }, {
    where: {
      story_id: req.body.story_id
    }
  }).then(function(statusUpdated) {
    if (!statusUpdated) {
      res.send({
        "status": false,
        "Message": "Failed to update the status"
      });
    } else {
      res.send({
        "status": true,
        "Message": "Story status successfully updated"
      });
    }
  })

}


exports.fetchStoryByStaus = function(projectId, storyStatus) {
  var statusList = [];
  if (storyStatus.length > 1) {
    statusList = storyStatus.split(',');
  } else {
    statusList.push(storyStatus);
  }
  var storyData = [];
  return db.findAll({
        where: {
          project_id: projectId,
          story_status: {
            $in: statusList
          }
        },
        include: [{
          model: user,
          attributes: ['email', 'firstName', 'lastName']
        }]
      })
      .then(function(storyList) {
        var listLength = storyList.length;
        _(storyList).forEach(function(value, key) {
          storyData.push(storyList[key].dataValues);
        })
        return storyData;
    })
}

exports.fetchTopStories = function(req, res) {
  var storyData = [];
  return db.findAll({
      where: {
        userId: req.param('userId')
      },
      limit: 5
    })
    .then(function(storyList) {
      _(storyList).forEach(function(value, key) {
        storyData.push(storyList[key].dataValues);
      })
      return storyData;
    })
}

exports.addStoryType = function(req, res) {
  var storyType = {
    story_type_label: req.body.storyType
  };

   sequelize.sync({ force: false }).then(function () {
      storyTypeDB.create(storyType).then(function (data) {
         res.send({"status":true, "message": "Story type added successfully"});
      }, function (error) {
         res.send({"status":false, "message": "Failed to add story type"});
      });
    });
}

exports.addStoryStatus = function(req, res) {
  var storyStatus = {
    story_status_label: req.body.storyStatus
  };

   sequelize.sync({ force: false }).then(function () {
      storyStatusDB.create(storyStatus).then(function (data) {
          res.send({"status":true, "message": "Story status added successfully"});
      }, function (error) {
         res.send({"status":false, "message": "Failed to add story status"});
      });
    });
}