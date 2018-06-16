const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");
import s from "mithril/stream";
import { debug } from "util";

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
    console.log("controller");
  },
  compState: {
    startIndex: 0,
    pageSize: 10,
    cols: [],
    lastIndex: 0
  },
  setPreviousRow: ref => {
    console.log("setPreviousRow");
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
    console.log("setNextRow");
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
    console.log("setPreviousPage");
    return () => {
      if (ref.startIndex > 0) {
        ref.startIndex -= ref.pageSize;
        ref.lastIndex -= ref.pageSize;
      }
    };
  },
  setNextPage: ref => {
    console.log("setNextPage");
    return () => {
      if (ref.startIndex < Data.length - ref.pageSize) {
        ref.startIndex += ref.pageSize;
        ref.lastIndex += ref.pageSize;
      }
    };
  },
  setLastPage: ref => {
    console.log("setLastPage");
    return () => {
      ref.startIndex = Data.length - ref.pageSize;
      ref.lastIndex = Data.length;
    };
  },
  setFirstPage: ref => {
    console.log("setFirstPage");
    return () => {
      ref.startIndex = 0;
      ref.lastIndex = ref.startIndex + ref.pageSize;
    };
  },
  onchange: (ref, val) => {
    console.log("onchange");
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
    console.log("from view");
    return (
      <div>
        <div class=" actions pb3 mw9 center ">
          <div class="cf ph2-ns">
            <div class="fl w-100 w-third-ns pa3">
              <div class="fr">
                <Button
                  class="bg-dark-blue white bl ba br3 br--left-ns b--near-white pa2"
                  value="|<"
                  onclick={vnode.state.setFirstPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-dark-blue white ba b--near-white pa2"
                  value="<<"
                  onclick={vnode.state.setPreviousPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-dark-blue white ba b--near-white pa2"
                  value="<"
                  onclick={vnode.state.setPreviousRow}
                  ref={vnode.state.compState}
                />
              </div>
            </div>
            <div class="stat fl w-100 w-third-ns pa2">
              <div class="fl pa2">
                <span class="pr1">Showing </span>
                {/* <input type="text" onchange={event => {
            const val = event.currentTarget.value;
            vnode.state.onchange(vnode.state.compState, val)
          }} /> */}
                <input
                  class="w3 pa2"
                  type="text"
                  onchange={event => {
                    vnode.state.compState.pageSize = event.currentTarget.value;
                  }}
                  value={vnode.state.compState.pageSize}
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">rows out of </span>
                <input
                  class="w3 pa2"
                  type="text"
                  value={Data.length}
                  disabled
                />
              </div>
              <div class="fl pa2">
                <span class="pr1">starting at row </span>
                <input
                  class="w3 pa2"
                  type="text"
                  onchange={event => {
                    vnode.state.compState.startIndex =
                      event.currentTarget.value;
                    vnode.state.compState.lastIndex =
                      vnode.state.compState.startIndex +
                      vnode.state.compState.pageSize;
                  }}
                  value={vnode.state.compState.startIndex}
                />
              </div>
            </div>
            <div class="fl w-100 w-third-ns pa3">
              <div class="fl">
                <Button
                  class="bg-dark-blue white ba b--near-white pa2"
                  value=">"
                  onclick={vnode.state.setNextRow}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-dark-blue white ba b--near-white pa2"
                  value=">>"
                  onclick={vnode.state.setNextPage}
                  ref={vnode.state.compState}
                />
                <Button
                  class="bg-dark-blue white ba br3 br--right-ns b--near-white pa2"
                  value=">|"
                  onclick={vnode.state.setLastPage}
                  ref={vnode.state.compState}
                />
              </div>
            </div>
          </div>
        </div>
        {
          <div class="table mw8 center">
            <div class="table-header cf bg-light-gray">
              {repeat(cols, {
                view: v =>
                  m(
                    "div",
                    { class: "cell fl w-25-ns pa2 b f4 ba tc" },
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
          </div>
        }
      </div>
    );
  }
};
module.exports = Table;
