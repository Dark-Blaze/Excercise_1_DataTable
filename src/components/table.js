const m = require("mithril");
const Data = require("../model/Data");
const Button = require("./Button");
import s from "mithril/stream";
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
  controller: vnode => {},
  compState: {
    sampleVar: s(234),
    startIndex: 0,
    currentIndex: s(0),
    pageSize: 0,
    cols: [],
    lastIndex: 0
  },
  update: ref => {
    let setState = () => {
      ref.sampleVar = ++u;
    };
    return setState;
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
      if(ref.startIndex > 0 ){
        ref.startIndex -= ref.pageSize;
        ref.lastIndex -= ref.pageSize;
      }
    };
  },
  setNextPage: ref => {
    return () => {
      if((ref.startIndex < (Data.length - ref.pageSize))){
        ref.startIndex += ref.pageSize
        ref.lastIndex += ref.pageSize;
      }
    };
  },
  setLastPage:ref =>{
    return() => {
        ref.startIndex = Data.length - ref.pageSize;
        ref.lastIndex = Data.length;
    }
  },
  setFirstPage:ref =>{
    return() => {
        ref.startIndex = 0;
        ref.lastIndex = ref.startIndex + ref.pageSize;
    }
  },
  view: vnode => {
    vnode.state.compState.pageSize = vnode.attrs.pageSize;
    let cols = vnode.attrs.columns;
    vnode.state.compState.lastIndex =
      vnode.state.compState.startIndex + vnode.state.compState.pageSize;
    let slicedData = Data.slice(
      vnode.state.compState.startIndex,
      vnode.state.compState.lastIndex
    );
    return (
      <div>
        <Button
          value="First Page"
          onclick={vnode.state.setFirstPage}
          ref={vnode.state.compState}
        />
        <Button
          value="Previous Page"
          onclick={vnode.state.setPreviousPage}
          ref={vnode.state.compState}
        />
        <Button
          value="Previous"
          onclick={vnode.state.setPreviousRow}
          ref={vnode.state.compState}
        />
        <Button
          value="Next"
          onclick={vnode.state.setNextRow}
          ref={vnode.state.compState}
        />
        <Button
          value="Next Page"
          onclick={vnode.state.setNextPage}
          ref={vnode.state.compState}
        />
        <Button
          value="Last Page"
          onclick={vnode.state.setLastPage}
          ref={vnode.state.compState}
        />

        {
          <div class="table mw8 center">
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
          </div>
        }
      </div>
    );
  }
};
module.exports = Table;
