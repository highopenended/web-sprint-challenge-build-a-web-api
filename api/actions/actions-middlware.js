const Action = require("./actions-model");
const Project = require("../projects/projects-model");

async function validateActionId(req, res, next) {
    const action = await Action.get(req.params.id);
    if (!action) {
        res.status(404).json({
            message: "action not found",
        });
    } else {
        req.action = action;
        req.id = req.params.id;
        next();
    }
}
async function validateActionBody(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    const checkProject = await Project.get(project_id);
    if (
        !checkProject ||
        !project_id ||
        !description ||
        !notes ||
        completed === undefined
    ) {
        res.status(400).json({
            message:
                "action must contain 'project_id', 'description', 'notes', 'completed'",
        });
    } else {
        req.actionBody = { project_id, description, notes, completed };
        next();
    }
}

module.exports = {
    validateActionId,
    validateActionBody,
};
