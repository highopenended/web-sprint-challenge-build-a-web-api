const express = require("express");
// const {  } = require("./actions-middlware");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const actions = await Action.get();
      if (!actions) {
        res.status(404).json({
          message: "no such action",
        });
      } else {
        res.status(200).json(actions);
      }
    } catch (err) {
      res.status(500).json({
        message: "problem finding action",
      });
    }
});

module.exports = router;