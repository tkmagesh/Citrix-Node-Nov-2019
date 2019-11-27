const fs = require('fs'),
    path = require('path');

const dbFile = path.join(__dirname, '../db/bugData.json');

/* 
//using callback
function getData(callback){
    fs.readFile(dbFile, { encoding : 'utf8'}, (err, fileContents) => {
        if (err)
            return callback(err);
        return callback(null, JSON.parse(fileContents));
    });
    
}

function saveData(data, callback){
    const rawData = JSON.stringify(data);
    fs.writeFile(dbFile, rawData, callback);
} */

/*
function getData() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbFile, { encoding: 'utf8' }, (err, fileContents) => {
            if (err)
                return reject(err);
            return resolve(JSON.parse(fileContents));
        });
    })
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        const rawData = JSON.stringify(data);
        fs.writeFile(dbFile, rawData, (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
}
*/
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function getData() {
    const fileContents = await readFileAsync(dbFile, { encoding : 'utf8'});
    return JSON.parse(fileContents);
}

const writeFileAsync = util.promisify(fs.writeFile);

function saveData(data) {
    return writeFileAsync(dbFile, JSON.stringify(data));
}

module.exports = { getData, saveData };
