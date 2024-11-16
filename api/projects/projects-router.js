const express = require("express");
const {
    validateProjectId,
    validateProjectBody,
} = require("./projects-middleware");
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

router.post("/", validateProjectBody, async (req, res) => {
    try {
        console.log(req.projectBody);
        const newProjectBody = await Project.insert(req.projectBody);
        if (!newProjectBody) {
            res.status(404).json({
                message: "Couldn't make project",
            });
        } else {
            res.status(200).json(newProjectBody);
        }
    } catch (err) {
        res.status(500).json({
            message: "problem creating project",
        });
    }
});

router.put("/:id", validateProjectId, validateProjectBody, async (req, res) => {
    try {
        const changes = {
            id: req.id,
            name: req.projectBody.name,
            description: req.projectBody.description,
            completed: req.projectBody.completed,
        };
        const updatedProject = await Project.update(req.project.id, changes);
        if (!updatedProject) {
            res.status(400).json({ message: "Couldn't update project" });
        } else {
            res.status(200).json(updatedProject);
        }
    } catch (err) {
        res.status(500).json({
            message: "problem updating project",
        });
    }
});

router.delete("/:id", validateProjectId, async (req, res) => {
    try {
        const deletedProject = await Project.remove(req.id);
        if (!deletedProject) {
            res.status(404).json({
                message: "Couldn't delete project",
            });
        } else {
            res.status(200).json({ message: "Deleted" });
        }
    } catch (err) {
        res.status(500).json({
            message: "problem creating project",
        });
    }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
    try {
        console.log(req.id);
        const actions = await Project.getProjectActions(req.id);
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({
            message: "problem getting actions",
        });
    }
});

module.exports = router;
