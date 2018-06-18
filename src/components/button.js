const m = require("mithril");

var Button = {
  view: function(vnode) {
    return (
      <button class={vnode.attrs.class} onclick={vnode.attrs.onclick}>
        {vnode.attrs.value}
      </button>
    );
  }
};
module.exports = Button;
