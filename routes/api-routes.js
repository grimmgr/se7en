
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      // username: req.user.username,
      email: req.user.email,
      password: req.user.password
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {

      res.json({});
    } else {

      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/bucket-list", (req, res) => {
    db.BucketList.findAll({})
      .then((list) => {
        res.json(list);
      });
  });

  app.get("/api/bucket-list/:id", (req, res) => {
    const userId = req.params.id;

    db.BucketList.findAll({
      raw: true,
      where: {
        UserId: userId
      }
    }).then((list) => {
      res.json(list);
    })
  })

  app.post("/api/bucket-list", (req, res) => {
    db.BucketList.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      collaborators: req.body.collaborators,
      location_id: req.body.location_id,
      location_name: req.body.location_name,
      UserId: req.body.userId
    })
      .then((data) => {
        // res.redirect("/member");
        res.json(data);
      })
      .catch(err => {
        res.status(401).json(err);
      })
  });

  app.delete("/api/bucket-list/:id", (req, res) => {
    const listItemId = req.params.id;

    db.BucketList.destroy({
      where: {
        id: listItemId
      }
    }).then((data) => {
      res.json(data);
    })
  })

  app.post("/api/links", (req, res) => {
    db.Links.create({
      userId: req.body.userId,
      bucketListId: req.body.bucketListId
    }).then((data) => {
      res.json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    })
  });

};

