import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { createUser, updateUser, getAllUsers, getSingleUser, run } from './database.js';
const app = express();
const router = express.Router();
dotenv.config();
const port = 3000;

app.use(cors({
  origin: ['http://127.0.0.1:5500'],
  credentials: true,
}));
// app.use((req, res, next) => {
//   console.log('Middleware executed');
//   next();
// });

app.use(express.json());

run();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});



app.post('/api/user',createUser)
app.get('/api/user',getAllUsers)

app.listen(port, () => {
  console.log("app is Listening in port " + port);
});
