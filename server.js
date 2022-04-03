const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");

const exphbs = require("express-handlebars");
const hbs = exphbs.create();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: true }).then(() => {
   app.listen(PORT, () => console.log("Now listening"));
});

//app.listen(PORT, () => console.log("Now listening"));
