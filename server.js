const express = require('express');
const cors = require('cors');
const projectsRouter = require('./resources/projects-router.js');
const actionsRouter = require('./resources/actions-router.js');

const server = express();
server.use(express.json());
server.use(cors());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req,res) => {
  
})

module.exports = server;