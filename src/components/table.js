const m = require("mithril");
const Data = require("../model/Data");

const Button = require("./Button");

var Table = {
  view: function(vnode) {
    return (
      <div>
        <Button value="asdf" />
        <div class="table mw9 center">
          <div class="table-header cf bg-light-gray">
            {Data.columns.map(col => {
              return <div class="cell fl w-100 w-25-ns pa2 b f3 sans-serif ba">{col}</div>;
            })}
          </div>
          <div class="table-body">
            <div class="table-row">
              {Data.tableData.map(obj => {
                return Object.values(obj).map(v => {
                  let dom = <div class="cell fl w-100 w-25-ns pa2 bb br bl f3 sans-serif ">{v}</div>
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
