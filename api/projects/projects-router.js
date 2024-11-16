const express = require("express");
const { validateProjectId } = require("./projects-middleware");
const Project = require("./projects-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.get();
    if (!projects) {
      res.status(404).json({
        message: "no such projects",
      });
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding project",
    });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", async (req, res) => {
    Project.insert();
});

module.exports = router;
