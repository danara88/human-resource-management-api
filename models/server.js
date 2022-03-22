require('colors');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

/**
 * Server class to initialize the API
 */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Connect to database
    this._connectDB();

    // Middlewares
    this._middlewares();

    // Paths

  }

  /**
   * Private method to connect database
   */
  async _connectDB() {
    await dbConnection();
  }

  /**
   * Private method to add middlewares
   */
  _middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  
  /**
   * Method to listen the port
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`.blue);
    });
  }
}

module.exports = Server;
