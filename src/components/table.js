const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");

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
              return (
                <div class="cell fl w-100 w-25-ns pa2 b f3 ba">
                  {col}
                </div>
              );
            })}
          </div>
          <div class="table-body">
            <div class="table-row">
             
              {/* {utils.repeat([1,2,3,3], m("div",{class:"cell fl w-100 w-25-ns pa2 bb br bl f3 "},""))} */}
              {Data.map(obj => {
                return Object.values(obj).map(v => {
                  let dom = (
                    <div class="cell fl w-100 w-25-ns pa2 bb br bl f3 sans-serif ">
                      {v}
                    </div>
                  );
                  return dom;
                });
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
module.exports = Table;
