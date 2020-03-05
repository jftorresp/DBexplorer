const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017;

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
      .connect()
      .then(client => {
        return client
          .db("local")
          .listCollections()
          .toArray();
      })
      .then(collections => console.log("Collections", collections))
      .catch(err => console.log("Error", err))
      .finally(client.close());
  };

  return mu;
}

module.exports = MongoUtils();
