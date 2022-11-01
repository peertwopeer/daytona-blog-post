const { MongoClient } = require("mongodb");

const CLIENT = new MongoClient(process.env.MONGO_CONN_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db_connect;

module.exports = {
  connect: (cb) => {
    CLIENT.connect((err, res) => {
      if (err || !res) return cb(err);
      db_connect = res.db("daytona-blog-post");
      console.log("db connected");
      return cb();
    });
  },
  getDB: () => db_connect,
};
