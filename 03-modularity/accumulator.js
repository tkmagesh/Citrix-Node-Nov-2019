
module.exports = function(defaultResult = 0){

    var result = defaultResult;

    return {
        add(x){
            result += x;
        },
        subtract(x){
            result -= x;
        },
        multiply(x){
            result *= x;
        },
        divide(x){
            result /= x;
        },
        getResult(){
            return result;
        }
    };
};