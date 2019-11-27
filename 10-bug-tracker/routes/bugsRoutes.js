const express = require('express'),
    router = express.Router(),
    bugService = require('../services/bugService');



router.get('/', (req, res, next) => {
    const bugs = bugService.getAll();
    res.json(bugs);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const resultBug = bugService.get(id);
    if (resultBug){
        res.json(resultBug);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res, next) => {
    const bugData = req.body;
    const newBug = bugService.addNew(bugData);
    res.status(201).json(newBug);
});

router.put('/:id', (req, res, next) => {
    const bugData = req.body,
        bugId = parseInt(req.params.id);
    const updatedBug = bugService.update(bugId, bugData);
    res.json(updatedBug);
});

router.patch('/:id', (req, res, next) => {
    const bugData = req.body,
        bugId = parseInt(req.params.id);

    const resultBug = bugService.partialUpdate(bugId, bugData);
    res.json(resultBug);
});

router.delete('/:id', (req, res, next) => {
    const bugId = parseInt(req.params.id);
    bugService.remove(bugId);
    res.json({});
});




module.exports = router;