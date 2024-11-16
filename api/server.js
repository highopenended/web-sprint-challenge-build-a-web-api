const express = require('express');
const server = express();
server.use(express.json());
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");


// function logger(req, res, next) {
//     const timeStamp = new Date().toLocaleString();
//     const method = req.method;
//     const url = req.originalUrl;
//     console.log(`[${timeStamp}] ${method} to ${url}`);
//     next();
// }







server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
    const timeStamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${timeStamp}] ${method} to ${url}`);
});


server.use("/api/projects/", projectsRouter);
server.use("/api/actions/", actionsRouter);


module.exports = server;
