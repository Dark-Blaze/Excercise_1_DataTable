const m = require("mithril");
const Table = require("./components/Table");

var AppComponent = {
  view: function() {
    const config = {
      page: {
        size: 10
      },
    };
    
    return (
      <div>
          <Table config={config}/>
      </div>
    );
  }
};

m.render(document.body, <AppComponent />);
