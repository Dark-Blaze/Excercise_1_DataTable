const m = require("mithril");
const Button = require("./Button");
const Data = require("../model/Data");

var Table = {
  view: function() {
    return (
      <div>
        <Button value="asdf" />

        <div class="table">
          {Data.map(v => {
            return <h1>{v}</h1>;
          })}
        </div>
      </div>
    );
  }
};
module.exports = Table;
