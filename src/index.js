const m = require("mithril");
const Table = require("./components/Table");

var AppComponent = {
  view: function() {

    const config = {
      page: {
        size: 10
      }
    };

    return (
      <div class="san-serif mw9 center">
        <Table
          pageSize={config.page.size}
          data={[]}
          columns={["","Locn_Nrb", "online_ord_Id", "KSN_Id", "SKU_Pro_Type_Cd"]}
          showSerialNo={false}

        />
      </div>
    );
  }
};

m.mount(document.body, AppComponent);
