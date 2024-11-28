// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const commentsRouter = express.Router();
const cors = require('./cors');
commentsRouter.use(bodyParser.json());

commentsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /comments');
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.end('Will add the comment: ' + req.body.name + ' with details: ' + req.body.comment);
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    res.end('Deleting all comments');
});

commentsRouter.route('/:commentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    res.end('Will send details of the comment: ' + req.params.commentId + ' to you');
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /comments/' + req.params.commentId);
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.write('Updating the comment: ' + req.params.commentId + '\n');
    res.end('Will update the comment: ' + req.body.name + ' with details: ' + req.body.comment);
})
.delete(cors.corsWithOptions, (req, res, next) => {
    res.end('Deleting comment: ' + req.params.commentId);
});

module.exports = commentsRouter;