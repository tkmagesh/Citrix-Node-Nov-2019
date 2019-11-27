const createError = require('http-errors');

const express = require('express'),
    router = express.Router(),
    bugService = require('../services/bugService');



router.get('/', async (req, res, next) => {
    //sync
    /* 
    const bugs = bugService.getAll();
    res.json(bugs); 
    */

    //async using callback
    /* bugService.getAll((err, bugsList) => {
        if (err){
            return next(createError(500));
        }
        res.json(bugsList);
    }) */

    //async using promises

    /* 
    bugService
        .getAll()
        .then(bugs => res.json(bugs))
        .catch(err => next(createError(500))); 
        */

    //async using 'async await'
    try {
        const bugs = await bugService.getAll();
        res.json(bugs);
    } catch (err){
        next(createError(500));
    }
});

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const resultBug = await bugService.get(id);
    if (resultBug){
        res.json(resultBug);
    } else {
        res.status(404).end();
    }
});

router.post('/', async (req, res, next) => {
    const bugData = req.body;
    const newBug = await bugService.addNew(bugData);
    res.status(201).json(newBug);
});

router.put('/:id', async (req, res, next) => {
    const bugData = req.body,
        bugId = parseInt(req.params.id);
    const updatedBug = await bugService.update(bugId, bugData);
    res.json(updatedBug);
});

router.patch('/:id', async (req, res, next) => {
    const bugData = req.body,
        bugId = parseInt(req.params.id);

    const resultBug = await bugService.partialUpdate(bugId, bugData);
    res.json(resultBug);
});

router.delete('/:id', async (req, res, next) => {
    const bugId = parseInt(req.params.id);
    await bugService.remove(bugId);
    res.json({});
});




module.exports = router;