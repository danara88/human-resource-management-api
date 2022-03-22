require('colors');
const express = require('express');
const { dbConnection } = require('../database/config');

/**
 * Server class
 */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Connect to database
    this._connectDB();

    // Middlewares

    // Paths
  }

  async _connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`.yellow);
    });
  }
}

module.exports = Server;
