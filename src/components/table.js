const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");
const Utils = require("../lib/utils");

Array.prototype.first = () => {
  return this && this[0];
};

var repeat = Utils.repeat.bind(Utils);
var u = 0;
var Table = {
  oncreate:()=>{
  },
  controller: vnode => {
    console.log("controller");
  },
  compState: {
    startIndex: 0,
    pageSize: 10,
    cols: [],
    lastIndex: 0
  },
  setPreviousRow: ref => {
    return () => {
      if (ref.startIndex < 1) {
    return;
      }
      --ref.startIndex;
      --ref.lastIndex;
    return;
    };
  },
  setNextRow: ref => {
    return () => {
      if (ref.lastIndex >= Data.length) {
        ref.lastIndex = Data.length;
        ref.startIndex = ref.lastIndex - ref.pageSize;
    return;
      }
      ++ref.startIndex;
      ++ref.lastIndex;
    return;
    };
  },
  setPreviousPage: ref => {
    return () => {
    if (ref.startIndex > 0) {
        if((ref.startIndex - ref.pageSize) <= 0){
          ref.startIndex = 0;
        }else{
          ref.startIndex -= ref.pageSize;
        }
        ref.lastIndex -= ref.pageSize;
      }
  };
  },
  setNextPage: ref => {
    return () => {
    if (ref.startIndex < Data.length - ref.pageSize) {
        ref.startIndex += ref.pageSize;
        ref.lastIndex += ref.pageSize;
      }
  };
  },
  setLastPage: ref => {
    return () => {
      if(ref.lastIndex == Data.length){
    return;
      }
      ref.startIndex = Data.length - ref.pageSize;
      ref.lastIndex = Data.length;
  };
  },
  setFirstPage: ref => {
    return () => {
    ref.startIndex = 0;
      ref.lastIndex = ref.startIndex + ref.pageSize;
    };
  },
  onchange: (ref, val) => {
    ref.pageSize = val;
    ref.lastIndex = ref.startIndex + ref.pageSize;
    m.redraw();
  },
  view: vnode => {
    let cols = vnode.attrs.columns;
    vnode.state.compState.lastIndex =
      vnode.state.compState.startIndex + vnode.state.compState.pageSize;
    let slicedData = Data.slice(
      vnode.state.compState.startIndex,
      vnode.state.compState.lastIndex
    );

    return (
      <div>
        <div class=" actions pb3  center ">
          <div class="cf ph2-ns flex  items-center">
            <div class="fl w-25 pt2">
              <div class="fr">
                <Button
                  class="bg-blue white bl ba br3 br--left-ns b--blue pa2"
                  value="|<"
                  onclick={vnode.state.setFirstPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value="<<"
                  onclick={vnode.state.setPreviousPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value="<"
                  onclick={vnode.state.setPreviousRow}
                  ref={vnode.state.compState}
                />
              </div>
            </div>
            <div class="fl  w-50 pt2">
            <div class="flex justify-center">
              <div class="fl pa2">
                <span class="pr1 ">Showing </span>
                <input
                  class=" pa2 w3"
                  type="text"
                  onchange={event => {
                    vnode.state.compState.pageSize = parseInt(
                      event.currentTarget.value
                    );
                  }}
                  value={vnode.state.compState.pageSize}
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">rows out of </span>
                <input
                  class="pa2 w4"
                  type="text"
                  value={Data.length}
                  disabled
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">starting at row </span>
                <input
                  class="pa2 w3"
                  type="text"
                  onchange={event => {
                    vnode.state.compState.startIndex = parseInt(
                      event.currentTarget.value
                    );
                    if(Data.length - vnode.state.compState.startIndex < vnode.state.compState.pageSize){
                      vnode.state.compState.pageSize = Data.length - vnode.state.compState.startIndex
                    }
                    vnode.state.compState.lastIndex =
                      vnode.state.compState.startIndex +
                      vnode.state.compState.pageSize;
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
                  onclick={vnode.state.setNextRow}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-blue white ba b--blue pa2"
                  value=">>"
                  onclick={vnode.state.setNextPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-blue white ba br3 br--right-ns b--blue pa2"
                  value=">|"
                  onclick={vnode.state.setLastPage}
                  ref={vnode.state.compState}
                />
              </div>
            </div>
          </div>
        </div>
        {
          <div class="table mw9 center">
          <div>
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
