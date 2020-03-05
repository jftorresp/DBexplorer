const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "database",
    colName = "collection";

  mu.connect = () => {
    const client = new MongoClient(`mongodb://${hostname}:${port}`, {
      useUnifiedTopology: true
    });
    return client.conect();
  };

  mu.collection = {};
}

module.exports = MongoUtils();
