  const express = require("express");

  const mongoose = require("mongoose");
  const cors = require("cors");
  const router = require("./Routes/route");
  const Screen = require("./models/screenSchema");
  const app = express();

  const port = 3000;

  const DB = "mongodb+srv://xaanamaan:xaanbisru@cluster0.7uudgug.mongodb.net/mydatabase?retryWrites=true&w=majority";

  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(DB, connectionOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  app.use(cors());
  app.use(express.json());
  app.use(router);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
