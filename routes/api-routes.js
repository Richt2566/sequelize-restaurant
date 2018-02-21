// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
//var orm = require("../config/orm.js");

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/icecream", function(req, res) {

   db.icecream.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
    
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/icecream", function(req, res) {
      
    db.icecream.create({
      flavor: req.body.flavor,
      devoured: req.body.devoured

    }).then(function(results){
      res.json(results);
    });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/icecream/:id", function(req, res) {
   
   db.icecream.destroy({
      where: {
        id: req.params.id
      }
   }).then(function(results){
    res.json(results);
   });

  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/icecream", function(req, res) {

    db.icecream.update({
      flavor: req.body.flavor,
      devoured: req.body.devoured
    },{
      where: {
        id: req.body.id
    }}).then(function(results){
      res.json(results);

    });
    
  });
};