const express = require('express'),
    router = express.Router();

const bugsList = [
    { id : 1, name : 'User access denied', isClosed : false },
    { id: 2, name: 'Application not responding', isClosed: true }
];

router.get('/', (req, res, next) => {
    res.json(bugsList);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const resultBug = bugsList.find(bug => bug.id === id);
    if (resultBug){
        res.json(resultBug);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res, next) => {
    const bugData = req.body,
        newBugId = bugsList.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1,
        newBug = { ...bugData, id : newBugId };

    bugsList.push(newBug);
    res.status(201).json(newBug);
})


module.exports = router;