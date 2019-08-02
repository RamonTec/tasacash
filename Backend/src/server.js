//const path = require("path");
//const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const schema = require("./Graphql/Schema/schema");
mongoose.Promise = global.Promise;
const rate = require("./models/rates");
//import { ApolloServer } from "apollo-server";
import { query, usd } from "./modules/request.js";
import { searchForDate } from "./models/currency.js";
var graphqlHTTP = require('express-graphql');

//Conexion a la BD
mongoose
  .connect("mongodb+srv://tasa:27592666@tasa-rgakk.mongodb.net/test?retryWrites=true&w=majority", {
    //quitar useNewUrlParser cuando este en produccion y colocar el nombre de usuario y clave de la base de datos
    dbName: "tasa",
    user: "tasa",
    pass: "OVED1bLnRIzsJdM5"
  })
  .then(() => console.log("BASE DE DATOS CONECTADA CORRECTAMENTE"))
  .catch(err => console.log(err));
//API LOCALBITCOINS

function interval() {
  let j = 0;
  query(j);
}

async function chandles() {
  let j = 0;
  await searchForDate(j);
}

setInterval(usd, 300000);
setInterval(interval, 300000);
setInterval(chandles, 400000);

app.set("PORT", process.env.port || 5000);

//Evaluando si estamos en produccion o no

// Middlewres
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(bodyParser.json());

//Ruta api
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// Ruta de api para produccion
// -> https://prueba-front-tasa.herokuapp.com/api
app.listen(app.get("port"), () => {
  console.log("SERVIDOR FUNCIONANDO EN EL  PUERTO: ", app.get("port"));
  console.log(`Graphql corriendo en el puerto ${app.get("port")} http://localhost:5000/api`);
});
