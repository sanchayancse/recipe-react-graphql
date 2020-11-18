const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });

const Recipe = require("./models/Recipe");

const User = require("./models/User");

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");
const { request } = require("express");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Innitialize applications
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))



// set up JWT authentication 

app.use(async(req,res, next)=>{

  const token = req.headers['authorization'];
  
  if(token !== "null"){
    try{
      const currentUser = await jwt.verify(token,process.env.SECRET);
      req.currentUser = currentUser
    }catch(err){
      console.log((err));
    }

  }

  next();

})


// Create graphql Application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({currentUser})=>({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    },
  }))
);
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server listning on ${PORT}`);
});