module.exports = function () {
    return {
        alters: require('./alters.json'),
        homeDef: require('./homeDef.json'),
        chartModel: require('./chartModel'),
        multiPagesMeta: require('./multiPagesMeta'),
        allPagesMeta: require('./allPagesMeta'),
        screenDef: require('./screenDef'),
        serviceList: require('./services')
    }
};
