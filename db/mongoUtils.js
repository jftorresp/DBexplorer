const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "database";

  
  mu.getDbs = () => {
    const url = `mongodb://${hostname}:${port}`;
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

  mu.collections = {};
  
  mu.getCollections = () => {
    const url = `mongodb://${hostname}:${port}`;
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client
      .then(client => {
        return client
          .db(dbName)
          .listCollections()
          .toArray();
      })
      .then(cols => console.log("Collections", cols))
      .finally(client.close());
  };

  return mu;
}

module.exports = MongoUtils();
