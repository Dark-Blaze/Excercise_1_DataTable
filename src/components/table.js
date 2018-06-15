const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");
var Stream = require("mithril/stream")

Array.prototype.first = () => {
  return this && this[0];
};

var utils = {
  isObject: obj => {
    return typeof obj == "object";
  },
  repeat: (data, template, key) => {
    if (!Array.isArray(data) && data.length === 0) {
      throw "Expected array for repeat";
    }

    return data.map(obj => {
      if (utils.isObject(obj)) {
        return Object.values(obj).map(val => {
          return m(template, { val });
        });
      }
      return m(template, { obj });
    });
  }
};

var repeat = utils.repeat.bind(utils);
var u = 0;
var Table = {
  controller: vnode => {
  },
  compState: {
    sampleVar : new Stream(234) 
  },
  update:(ref)=>{
    let setState = () =>{ref.sampleVar = ++u}
    return setState;
  },
  view: vnode => {
    let pageSize = vnode.attrs.pageSize;
    let data = vnode.attrs.data;
    let cols = vnode.attrs.columns;
    let startIndex = 0;
    let currentPageIndex = 0;
    let length = Data.length;
    let lastIndex = startIndex + pageSize > length ? length : startIndex + pageSize;
    let slicedData = Data.slice(startIndex, lastIndex);
    console.log(Table)
    return (
      <div>
        <Button value="Previous" onclick={vnode.state.update} ref={vnode.state.compState}/>
        <Button value="Next" onclick={vnode.state.update} ref={vnode.state.compState}/>
        {vnode.state.compState.sampleVar}
        { <div class="table mw8 center">
          <div class="table-header cf bg-light-gray">
            {repeat(cols, {
              view: v =>
                m(
                  "div",
                  { class: "cell fl w-20-ns pa2 b f4 ba tc" },
                  v.attrs.obj
                )
            })}
          </div>
          <div class="table-body">
            <div class="table-row">
              {repeat(slicedData, {
                view: v =>
                  m(
                    "div",
                    { class: "cell fl w-100 w-25-ns pa2 bb br bl f3 " },
                    v.attrs.val
                  )
              })}
            </div>
          </div>
        </div> }
      </div>
    );
  }
};
module.exports = Table;
