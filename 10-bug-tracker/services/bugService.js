const bugDb = require('./bugDb');



/* 
function getAll(callback){
    bugDb.getData(callback);
}
 */

function getAll(){
    return bugDb.getData();
}

async function get(id){
    let bugsList = await bugDb.getData();
    return bugsList.find(bug => bug.id === id);
}

async function addNew(bugData){
    let bugsList = await bugDb.getData();
    const newBugId = bugsList.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
    const newBug = { ...bugData, id: newBugId };
    bugsList.push(newBug);
    await bugDb.saveData(bugsList);
    return newBug;
}

async function update(id, bugData){
    let bugsList = await bugDb.getData();
    bugsList = bugsList.map(bug => bug.id === id ? bugData : bug);
    await bugDb.saveData(bugsList);
    return bugData;
}

async function partialUpdate(bugId, bugData){
    let bugsList = await bugDb.getData();
    bugsList = bugsList.map(bug => bug.id === bugId ? { ...bug, ...bugData } : bug);
    await bugDb.saveData(bugsList);
    const resultBug = bugsList.find(bug => bug.id === bugId);
    return resultBug;
}

async function remove(bugId) {
    let bugsList = await bugDb.getData();
    bugsList = bugsList.filter(bug => bug.id !== bugId);
    await bugDb.saveData(bugsList);
}

module.exports =  { getAll, get, addNew, update, partialUpdate, remove };
