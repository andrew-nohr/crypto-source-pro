const path = require("path");
const express = require("express");
const routes = require("./routes");
// const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });

app.listen(PORT, () => console.log("Now listening"));
