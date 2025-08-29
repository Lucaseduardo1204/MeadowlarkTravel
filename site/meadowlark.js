const express = require("express");
const { engine } = require("express-handlebars");
const handlers = require("./lib/handlers");

const app = express();

// Cria o view engine e configura o Express
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

//pagina 404 personalizada
app.use(handlers.notFound);

//Pagina 500 personalizada
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        " ; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
// O importante de saber e se voce executar um arquivo JavaScript
// diretamente com o node, require.main sera igual ao objeto global
// module; caso contrario, o arquivo sera importado de outro modulo.
