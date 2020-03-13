const express = require("express");
const router = express.Router();
const oktaClient = require("../lib/oktaClient");
const Users = require("./users-model");

router.post("/register", (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

router.post("/newUser", async (req, res, next) => {
  try {
    const saved = await Users.add(req.body, "id");

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.get("/user", (req, res) => {
  Users.findBy(req.body.email)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

module.exports = router;
