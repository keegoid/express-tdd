const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://tdd_user:KdAqA-Dqx9-RF@zqZMKq@cluster0-xqa7p.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
