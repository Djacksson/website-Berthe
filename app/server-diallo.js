const app = require('./app');
const http = require('http');
const { normalizePort } = require('./configs/config.port');
const server = http.createServer(app);
require('dotenv').config()

//====================================================================>
//====================================================================>
const port = normalizePort(process.env.HOST_PORT || '5000');
server.listen(port, process.env.HOST_IP_ADDRESS, (err) => {
  if (err) throw err
  console.log(`Server is listening: http://${process.env.HOST_IP_ADDRESS}:${port}/`);
})