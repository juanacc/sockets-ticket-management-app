const express = require('express');
const cors = require('cors');
const {socketController} = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app); //servidor de sockets
    this.io = require('socket.io')(this.server);
    this.paths = {}

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();

    //Sockets events
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors()); //para sockets no es necesario pero lo dejamos por las dudas que hagamos algo mas

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    //this.app.use(this.paths.auth, require('../routes/auth'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
