require('colors');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

/**
 * Server class to initialize the API
 */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth   : '/api/auth',
      users  : '/api/users',
      uplaods: '/api/uploads'
    };

    // Connect to database
    this._connectDB();

    // Middlewares
    this._middlewares();

    // Paths
    this._routes();

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
    this.app.use(fileUpload({
      useTempFiles    : true,
      tempFileDir     : '/tmp/',
      createParentPath: true
    }));
  }

  /**
   * Method to define the API routes
   */
  _routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.uplaods, require('../routes/uploads.routes'));
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
