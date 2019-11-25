var fs = require('fs');

//error first callback pattern
fs.readFile('./sample.txt', { encoding : 'utf8'}, function( err, fileContents){
    if (err){
        console.log('something went wrong!!');
        return;
    }
    console.log(fileContents);
    console.log('Thats all folks!');
});
