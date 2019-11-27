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

module.exports = { getData, saveData };
