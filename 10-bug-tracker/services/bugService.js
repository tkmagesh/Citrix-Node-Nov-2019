const bugDb = require('./bugDb');



function getAll(){
    let bugsList = bugDb.getData();
    return [...bugsList];
}

function get(id){
    let bugsList = bugDb.getData();
    return bugsList.find(bug => bug.id === id);
}

function addNew(bugData){
    let bugsList = bugDb.getData();
    const newBugId = bugsList.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
    const newBug = { ...bugData, id: newBugId };
    bugsList.push(newBug);
    bugDb.saveData(bugsList);
    return newBug;
}

function update(id, bugData){
    let bugsList = bugDb.getData();
    bugsList = bugsList.map(bug => bug.id === id ? bugData : bug);
    return bugData;
}

function partialUpdate(bugId, bugData){
    let bugsList = bugDb.getData();
    bugsList = bugsList.map(bug => bug.id === bugId ? { ...bug, ...bugData } : bug);
    const resultBug = bugsList.find(bug => bug.id === bugId);
    return resultBug;
}

function remove(bugId) {
    let bugsList = bugDb.getData();
    bugsList = bugsList.filter(bug => bug.id !== bugId);
}

module.exports =  { getAll, get, addNew, update, partialUpdate, remove };
