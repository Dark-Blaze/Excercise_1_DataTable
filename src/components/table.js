const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");

Array.prototype.first = () => {
  return this && this[0];
}


var utils = {
  isObject: obj => {
    return typeof obj == "object";
  },
  repeat: (data, template, key) => {
    if (!Array.isArray(data) && data.length === 0) {
      throw "Expected array for repeat";
    }

    return data.map(obj => {
      if(utils.isObject(obj)){
        return Object.values(obj).map(val => {
          return m(template, { val });
        });
      }
      return m(template, { obj }) 
    });
  }
};

var repeater = utils.repeat.bind(utils);

var Table = {
  controller: vnode => {},
  view: vnode => {
    let pageSize = vnode.attrs.pageSize;
    let data = vnode.attrs.data;
    let cols = vnode.attrs.columns;
    let startIndex = 0;
    let currentPageIndex = 0;

    return (
      <div>
        <Button value="asdf" />
        <div class="table mw8 center">
          <div class="table-header cf bg-light-gray">
            {repeater(cols, {
              view: v =>
                m(
                  "div",
                  { class: "cell fl w-20-ns pa2 b f4 ba tc" },
                  v.attrs.obj
                )
            })}
            {/* {cols.map(col => {
              return <div class="cell fl w-20-ns pa2 b f4 ba tc">{col}</div>;
            })} */}
          </div>
          <div class="table-body">
            <div class="table-row">
              {repeater(Data, {
                view: v =>
                  m(
                    "div",
                    { class: "cell fl w-100 w-25-ns pa2 bb br bl f3 " },
                    v.attrs.val
                  )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
module.exports = Table;
