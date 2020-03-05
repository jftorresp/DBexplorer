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
      .finally(client.close());
  };

  return mu;
}

module.exports = MongoUtils();
