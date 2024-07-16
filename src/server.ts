import express from 'express';
import {createServer} from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';
import cors from 'cors';
import router from './router'
import { protect } from './modules/auth'
import { appSignin, createNewUser, signin } from './handlers/user';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.io = io;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
      console.log('message received:', data);
      // Broadcast the message to all clients
      io.emit('message', data);
  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

//middleare with custom parameter
const customLogger = (message) => (req,res,next) => {
  console.log(`Hello from ${message}`)
  next()
}

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(customLogger('test'))
app.use(cors())



//custom test middleware, we use it globally with app.use
// app.use((req,res,next) => {
//   req.example = 'test done'
//   next()
// })
// app.use((req,res,next) => {
//   res.status(401)
//   res.send('Nope')
// })

app.get('/', (req, res) => {
  res.status(200)
  res.json({message: 'hello'})
});

app.use('/api',protect,router);
app.post("/user", createNewUser);
app.post("/signin", signin);
app.post("/app-signin", appSignin);
 


export default server;

