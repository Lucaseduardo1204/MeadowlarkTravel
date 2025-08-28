const express = require("express");
const { engine } = require("express-handlebars");
const handlers = require("./lib/handlers");

const fortune = require("./lib/fortune");

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
