const m = require('mithril');
const Table = require('./components/Table');

var AppComponent = {
    view: function() {
      return (
        <main>
          <h1><Table /></h1>
        </main>
      )
    }
  }

m.render(document.body, <AppComponent />)