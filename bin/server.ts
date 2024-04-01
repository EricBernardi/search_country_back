import app from '../src/app';
import http from 'http';

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

console.log('API rodando na porta ' + port);
