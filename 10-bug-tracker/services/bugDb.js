const fs = require('fs'),
    path = require('path');

const dbFile = path.join(__dirname, '../db/bugData.json');

function getData(){
    const rawData = fs.readFileSync(dbFile, { encoding : 'utf8'} );
    return JSON.parse(rawData);
}

function saveData(data){
    const rawData = JSON.stringify(data);
    fs.writeFileSync(dbFile, rawData);
}

module.exports = { getData, saveData };
