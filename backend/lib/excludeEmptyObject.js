const excludeEmptyObject = (arrOfObj) => arrOfObj.filter((obj) => Object.keys(obj).length);

module.exports = excludeEmptyObject;
