const m = require("mithril");

var Button = {
  view: function(vnode) {
    return (
        <button class="btn">{vnode.attrs.value}</button>
    );
  }
};
module.exports = Button;
