const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");

var utils = {
  repeat: (data, template, key) => {
    if (!Array.isArray(data) && data.length === 0) {
      throw "Expected array for repeat";
    }
    return data.map(obj => {
      return Object.values(obj).map(val => {
        return m(template, { val });
      });
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

    return (
      <div>
        <Button value="asdf" />
        <div class="table mw9 center">
          <div class="table-header cf bg-light-gray">
            {cols.map(col => {
              return <div class="cell fl w-100 w-25-ns pa2 b f3 ba">{col}</div>;
            })}
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
