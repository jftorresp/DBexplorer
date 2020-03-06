"use strict";
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

function MongoUtils() {
  const mu = {};
  // hostname = "localhost",
  // port = 27017;
  let dbHostName = process.env.dbHostName || "";
  let dbUser = process.env.dbUser || "";
  let dbPassword = process.env.dbPassword || "";

  mu.getDbs = () => {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHostName}?retryWrites=true&w=majority`;
    // const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client
      .connect()
      .then(client => {
        return client
          .db()
          .admin()
          .listDatabases();
      })
      .finally(() => client.close());
  };

  mu.getCollections = db => {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHostName}?retryWrites=true&w=majority`;
    // const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url, { useUnifiedTopology: true });

    return client
      .connect()
      .then(client => {
        return client
          .db(db)
          .listCollections()
          .toArray();
      })
      .finally(() => client.close());
  };

  mu.getData = (db, col) => {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHostName}?retryWrites=true&w=majority`;
    // const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client.connect().then(client => {
      const collection = client.db(db).collection(col);
      return collection
        .find()
        .limit(20)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });
  };

  mu.insertRegister = (db, col, reg) => {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHostName}?retryWrites=true&w=majority`;
    // const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url, { useUnifiedTopology: true });

    return client
      .connect()
      .then(client => {
        const collection = client.db(db).collection(col);
        return collection.insertOne(reg);
      })
      .finally(() => client.close());
  };

  return mu;
}

module.exports = MongoUtils();
