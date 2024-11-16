const express = require("express");
const { validateActionId, validateActionBody } = require("./actions-middlware");
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

router.get("/:id", validateActionId, async (req, res) => {
    try {
        const actions = await Action.get(req.id);
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

router.post("/", validateActionBody, async (req, res) => {
    try {
        const newAction = await Action.insert(req.actionBody);
        if (!newAction) {
            res.status(404).json({
                message: "no such action",
            });
        } else {
            console.log(newAction.project_id);
            res.status(200).json(newAction);
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding action",
        });
    }
});

router.put("/:id", validateActionId, validateActionBody, async (req, res) => {
    try {
        const changes = {
            id: req.id,
            name: req.actionBody.name,
            description: req.actionBody.description,
            completed: req.actionBody.completed,
        };
        const updatedAction = await Action.update(req.action.id, changes);
        if (!updatedAction) {
            res.status(404).json({
                message: "Couldn't update actions",
            });
        } else {
            res.status(200).json(updatedAction);
        }
    } catch (err) {
        res.status(500).json({
            message: "problem updating actions",
        });
    }
});

router.delete("/:id", validateActionId, async (req, res) => {
    try {
        const deletedAction = await Action.remove(req.id);
        if (!deletedAction) {
            res.status(404).json({
                // message: "Couldn't delete actions",
            });
        } else {
            res.status(200).json({});
        }
    } catch (err) {
        res.status(500).json({
            // message: "problem creating project",
        });
    }
});

module.exports = router;
