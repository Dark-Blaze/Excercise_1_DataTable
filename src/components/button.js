const m = require("mithril");

var Button = {
  view: function(vnode) {
    return (
      <button class="btn" onclick={vnode.attrs.onclick(vnode.attrs.ref)}>
        {vnode.attrs.value}
      </button>
    );
  }
};
module.exports = Button;
