const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
    const project = await Project.get(req.params.id);
    if (!project) {
        res.status(404).json({ message: "project not found" });
    } else {
        req.project = project;
        req.id = req.params.id;
        next();
    }
}

async function validateProjectBody(req, res, next) {
    const { name, description, completed } = req.body;
    console.log(completed);

    if (!name || !description || completed === undefined) {
        res.status(400).json({
            message: "project must contain 'name', 'description', 'completed'",
        });
    } else {
        req.projectBody = { name, description, completed };
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProjectBody,
};
