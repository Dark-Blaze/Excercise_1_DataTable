const m = require("mithril");

var Utils = {
  isObject: obj => {
    return typeof obj == "object";
  },
  repeat: (data, template, key) => {
    if (!Array.isArray(data) && data.length === 0) {
      throw "Expected array for repeat";
    }

    return data.map(obj => {
      if (Utils.isObject(obj)) {
        return Object.values(obj).map(val => {
          return m(template, { val });
        });
      }
      return m(template, { obj });
    });
  }
}


module.exports = Utils;
