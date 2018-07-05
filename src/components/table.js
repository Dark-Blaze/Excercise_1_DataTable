const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");
const Utils = require("../lib/utils");
const Pager = require('../lib/Pager');

var repeat = Utils.repeat.bind(Utils);
var page;


var Table = {
  oninit:(vnode)=>{
    vnode.state["compState"] =  {
      startIndex: 0,
      pageSize: parseInt(vnode.attrs.pageSize),
      cols: vnode.attrs.columns,
      lastIndex: 0,
      length : Data.length
    }
    vnode.state.compState.lastIndex = vnode.state.compState.startIndex + vnode.state.compState.pageSize;
    page = new Pager(vnode.state.compState.pageSize, vnode.state.compState.length);
  },
  getNextPage: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getNextPage(ref.startIndex, ref.lastIndex);
  },
  setNextRow: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getNextRow(ref.startIndex, ref.lastIndex);
  },
  getLastPage: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getLastPage();
  },
  getPreviousRow: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getPreviousRow(ref.startIndex, ref.lastIndex);
  },
  getPreviousPage: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getPreviousPage(ref.startIndex, ref.lastIndex);
  },
  getFirstPage: ref => {
    return () => [ref.startIndex, ref.lastIndex] = page.getFirstPage();
  },
  setPageSize: (ref, val) =>{
    ref.pageSize = parseInt(val);
    page.setPageSize(ref.pageSize);
  },
  setStartRow:(ref, val)=>{
    val = parseInt(val);
    val = (val < ref.length) ? val : ref.length - 1  ;
    [ref.startIndex, ref.lastIndex, ref.pageSize] = page.getPageByStartRow(ref.startIndex, ref.lastIndex, val);
  },
  view: vnode => {
    vnode.state.compState.lastIndex = vnode.state.compState.startIndex + vnode.state.compState.pageSize;
    let slicedData = Data.slice(vnode.state.compState.startIndex,vnode.state.compState.lastIndex);

    return (
      <div>
        <div class=" actions pb3  center ">
          <div class="cf ph2-ns flex  items-center">
            <div class="fl w-25 pt2">
              <div class="fr">
                <Button
                  class="bg-blue white bl ba br3 br--left-ns b--blue pa2"
                  value="|<"
                  onclick={vnode.state.getFirstPage(vnode.state.compState)}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value="<<"
                  onclick={vnode.state.getPreviousPage(vnode.state.compState)}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value="<"
                  onclick={vnode.state.getPreviousRow(vnode.state.compState)}
                />
              </div>
            </div>
            <div class="fl  w-50 pt2">
            <div class="flex justify-center">
              <div class="fl pa2">
                <span class="pr1 ">Showing </span>
                <input
                  class=" pa2 w3"
                  type="number"
                  onchange={event => {
                    vnode.state.setPageSize(vnode.state.compState, event.currentTarget.value);
                  }}
                  value={vnode.state.compState.pageSize}
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">rows out of </span>
                <input
                  class="pa2 w4"
                  type="number"
                  value={Data.length}
                  disabled
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">starting at row </span>
                <input
                  class="pa2 w3"
                  type="number"
                  onchange={event => {
                    vnode.state.setStartRow(vnode.state.compState, event.currentTarget.value);
                  }}
                  value={vnode.state.compState.startIndex}
                />
              </div>
              </div>
            </div>
            <div class="fl w-25 pt2">
              <div class="fl ">
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value=">"
                  onclick={vnode.state.setNextRow(vnode.state.compState)}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value=">>"
                  onclick={vnode.state.getNextPage(vnode.state.compState)}
                />
                <Button
                  class="bg-blue white ba br3 br--right-ns b--blue pa2"
                  value=">|"
                  onclick={vnode.state.getLastPage(vnode.state.compState)}
                />
              </div>
            </div>
          </div>
        </div>
        {
          <div class="table mw9 center">
          <div>
            <div class="table-header cf bg-light-gray">
              {repeat(vnode.state.compState.cols, {
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
                      { class: "cell fl w-100 w-20-ns pa2 bb br bl f3 " },
                      v.attrs.val
                    )
                })}
              </div>
            </div>
            </div>
          </div>
        }
      </div>
    );
  }
};
module.exports = Table;
