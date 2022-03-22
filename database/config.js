require('colors');
const mongoose = require('mongoose');

/**
 * Method to connect to mongo database
 */
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected !'.green);
  } catch (error) {
    console.log(error);
    throw new Error('Database not connected'.red);
  }
};

module.exports = {
  dbConnection,
};
