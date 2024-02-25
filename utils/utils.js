const tryIt = (cb = (any) => any, args = []) => {
    try{
        return cb(...args);
    }
    catch{}
}

module.exports = {
    tryIt
}