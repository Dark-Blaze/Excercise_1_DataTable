const m = require("mithril");

var MyComponent = {
    view: function() {
      return (
        <main>
          <h1>Hello world</h1>
        </main>
      )
    }
  }

  m.render(document.body, <MyComponent />)

