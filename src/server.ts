import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user';

const app = express();

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

export default app;

