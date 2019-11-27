(function(){
    function addSync(x,y){
        console.log(`   [@Service] processing ${x} and ${y}`);
        var result = x + y;
        console.log(`   [@Service] returning result`);
        return result;
    }

    function addSyncClient(x,y){
        console.log(`[@Client] triggering service`);
        var result = addSync(x,y);
        console.log(`[@Client] result = ${result}`);
    }

    window['addSyncClient'] = addSyncClient;

    function addAsync(x, y, callback) {
        console.log(`   [@Service] processing ${x} and ${y}`);
        setTimeout(function(){
            var result = x + y;
            console.log(`   [@Service] returning result`);
            callback(result);
        }, 3000);
    }

    function addAsyncClient(x, y) {
        console.log(`[@Client] triggering service`);
        addAsync(x, y, function(result){
            console.log(`[@Client] result = ${result}`);
        });
    }

    window['addAsyncClient'] = addAsyncClient;

    function addAsyncPromise(x, y) {
        console.log(`   [@Service] processing ${x} and ${y}`);
        var p = new Promise(function(resolve, reject){
            setTimeout(function () {
                var result = x + y;
                console.log(`   [@Service] returning result`);
                resolve(result);
            }, 3000);
        });
        return p;
    }

    window['addAsyncPromise'] = addAsyncPromise;
})();

//Usage 

/* var p = addAsyncPromise(100, 200);
p.then(result => console.log(`[@Client] result = ${result}`));

//follow up with an async operation 
var p2 = p.then(result => {
	return new Promise((resolve, reject) => {
            setTimeout(function () {
                var doubleResult = result * 2;
                resolve(doubleResult);
            }, 3000);
        });
    })

//follow up with a sync operation
var p2 = p.then(result => {
	return new Promise((resolve, reject) => {
		var doubleResult = result * 2;
            resolve(doubleResult);
        });
    });
   
var p2 = p.then(result => {
    var doubleResult = result * 2;
    return Promise.resolve(doubleResult);
});

var p2 = p.then(result => {
    var doubleResult = result * 2;
    return doubleResult;
});
 */