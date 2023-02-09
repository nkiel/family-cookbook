import app from './app';
import debug from 'debug';
import http from 'http';
// import Error from 'node/http';

debug('test-proj:server');

/**
 * Get port from environment and store in Express.
 */

var port = Number(process.env.PORT) || '3333';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
*/

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`Server started on port ${port}`);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: Error) {
  // if (error.syscall !== 'listen') {
  //   throw error;
  // }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    console.error(`${error.name}\n\t${error.message}\n@${error.stack}`);
  // handle specific listen errors with friendly messages
  // switch (error.code) {
  //   case 'EACCES':
  //     console.error(bind + ' requires elevated privileges');
  //     process.exit(1);
  //     break;
  //   case 'EADDRINUSE':
  //     console.error(bind + ' is already in use');
  //     process.exit(1);
  //     break;
  //   default:
  //     throw error;
  // }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + (addr ? addr.port : 'null');
  debug('Listening on ' + bind);
}
